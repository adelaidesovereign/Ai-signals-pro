// ConvertKit v4 API integration.
// Docs: https://developers.convertkit.com/v4.html
// All calls fail soft — ConvertKit outages must never block a purchase,
// signup, or quiz submission.

type SubscribeInput = {
  email: string;
  firstName?: string;
  source?: string;
  tagIds?: string[];
  formId?: string;
};

const API_BASE = "https://api.kit.com/v4";

function getAuthHeaders(): HeadersInit | null {
  const apiKey = process.env.CONVERTKIT_API_KEY;
  if (!apiKey) return null;
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Kit-Api-Key": apiKey,
  };
}

async function convertkitRequest<T>(
  path: string,
  init: RequestInit,
): Promise<T | null> {
  const headers = getAuthHeaders();
  if (!headers) {
    console.warn("[convertkit] CONVERTKIT_API_KEY not set — skipping call.");
    return null;
  }
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      ...init,
      headers: { ...headers, ...(init.headers ?? {}) },
    });
    if (!res.ok) {
      const text = await res.text();
      console.error(`[convertkit] ${path} failed`, res.status, text);
      return null;
    }
    return (await res.json()) as T;
  } catch (err) {
    console.error(`[convertkit] ${path} threw`, err);
    return null;
  }
}

export async function subscribeToConvertKit(input: SubscribeInput) {
  const { email, firstName, tagIds, formId } = input;
  const fallbackFormId = formId ?? process.env.CONVERTKIT_FORM_FOOTER;

  // 1. Create or update the subscriber.
  const subscriber = await convertkitRequest<{
    subscriber: { id: number; email_address: string };
  }>("/subscribers", {
    method: "POST",
    body: JSON.stringify({
      email_address: email,
      first_name: firstName,
      state: "active",
    }),
  });

  const subscriberId = subscriber?.subscriber?.id;

  // 2. Attach to the form if one is configured.
  if (subscriberId && fallbackFormId) {
    await convertkitRequest(`/forms/${fallbackFormId}/subscribers`, {
      method: "POST",
      body: JSON.stringify({
        email_address: email,
        first_name: firstName,
      }),
    });
  }

  // 3. Apply any tags.
  if (subscriberId && tagIds?.length) {
    await Promise.all(
      tagIds.map((tagId) =>
        convertkitRequest(`/tags/${tagId}/subscribers`, {
          method: "POST",
          body: JSON.stringify({ email_address: email }),
        }),
      ),
    );
  }

  return subscriber;
}

const QUIZ_LAYER_TAGS: Record<number, string | undefined> = {
  1: process.env.CONVERTKIT_TAG_QUIZ_LAYER_1,
  2: process.env.CONVERTKIT_TAG_QUIZ_LAYER_2,
  3: process.env.CONVERTKIT_TAG_QUIZ_LAYER_3,
  4: process.env.CONVERTKIT_TAG_QUIZ_LAYER_4,
  5: process.env.CONVERTKIT_TAG_QUIZ_LAYER_5,
  6: process.env.CONVERTKIT_TAG_QUIZ_LAYER_6,
  7: process.env.CONVERTKIT_TAG_QUIZ_LAYER_7,
};

export async function subscribeQuizResult({
  email,
  firstName,
  layer,
}: {
  email: string;
  firstName?: string;
  layer: number;
}) {
  const tag = QUIZ_LAYER_TAGS[layer];
  return subscribeToConvertKit({
    email,
    firstName,
    source: "quiz",
    formId: process.env.CONVERTKIT_FORM_QUIZ,
    tagIds: tag ? [tag] : [],
  });
}

export async function tagBuyer({
  email,
  product,
}: {
  email: string;
  product: "field-guide" | "certification" | "inner-circle";
}) {
  const tag =
    product === "field-guide"
      ? process.env.CONVERTKIT_TAG_FIELD_GUIDE_BUYER
      : product === "certification"
        ? process.env.CONVERTKIT_TAG_CERTIFICATION_BUYER
        : process.env.CONVERTKIT_TAG_INNER_CIRCLE_MEMBER;
  if (!tag) return null;
  return convertkitRequest(`/tags/${tag}/subscribers`, {
    method: "POST",
    body: JSON.stringify({ email_address: email }),
  });
}
