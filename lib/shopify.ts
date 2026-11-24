const rawDomain = process.env.SHOPIFY_STORE_DOMAIN || "";
const domain = rawDomain.replace(/^https?:\/\//i, "").replace(/\/+$/, "");
const token = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN || "";
const apiVersion = process.env.SHOPIFY_API_VERSION || "2026-10";

export type ShopifyImage = {
  url: string;
  altText: string | null;
  width: number;
  height: number;
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  featuredImage: ShopifyImage | null;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
};

export type ShopifyProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: {
    amount: string;
    currencyCode: string;
  };
  selectedOptions: {
    name: string;
    value: string;
  }[];
  image: ShopifyImage | null;
};

export type ShopifyProductDetail = ShopifyProduct & {
  description: string;
  descriptionHtml: string;
  images: ShopifyImage[];
  options: {
    id: string;
    name: string;
    values: string[];
  }[];
  variants: ShopifyProductVariant[];
};

export type ShopifyArticle = {
  id: string;
  handle: string;
  title: string;
  excerpt: string | null;
  contentHtml: string;
  publishedAt: string;
  tags: string[];
  authorV2: {
    name: string;
  } | null;
  image: ShopifyImage | null;
  blog: {
    handle: string;
    title: string;
  };
  seo: {
    title: string | null;
    description: string | null;
  } | null;
};

export type ShopifyBlog = {
  handle: string;
  title: string;
  seo: {
    title: string | null;
    description: string | null;
  } | null;
  articles: ShopifyArticle[];
};

export type ShopifyCollection = {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: ShopifyImage | null;
  products: ShopifyProduct[];
};

function assertShopifyConfig() {
  if (!domain || !token) {
    throw new Error(
      "Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_STOREFRONT_PRIVATE_TOKEN in environment variables."
    );
  }
}

export async function shopifyFetch<T>({
  query,
  variables = {},
  tags = [],
}: {
  query: string;
  variables?: Record<string, unknown>;
  tags?: string[];
}): Promise<T> {
  assertShopifyConfig();

  const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Shopify-Storefront-Private-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    next: { tags, revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(
      `Shopify API Error: ${response.status} ${response.statusText}`
    );
  }

  const json = await response.json();

  if (Array.isArray(json.errors) && json.errors.length > 0) {
    throw new Error(json.errors[0]?.message || "Shopify GraphQL error");
  }

  if (!json.data) {
    throw new Error("Shopify API returned empty data payload.");
  }

  return json.data as T;
}

export async function getProducts(first = 12): Promise<ShopifyProduct[]> {
  const query = /* GraphQL */ `
    query getProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            handle
            title
            featuredImage {
              url
              altText
              width
              height
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    products: { edges: { node: ShopifyProduct }[] };
  }>({
    query,
    variables: { first },
    tags: ["products"],
  });

  return data.products.edges.map((edge) => edge.node);
}

export async function getProductByHandle(
  handle: string
): Promise<ShopifyProductDetail | null> {
  const query = /* GraphQL */ `
    query getProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        handle
        title
        description
        descriptionHtml
        featuredImage {
          url
          altText
          width
          height
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
              width
              height
            }
          }
        }
        options {
          id
          name
          values
        }
        variants(first: 50) {
          edges {
            node {
              id
              title
              availableForSale
              price {
                amount
                currencyCode
              }
              selectedOptions {
                name
                value
              }
              image {
                url
                altText
                width
                height
              }
            }
          }
        }
      }
    }
  `;

  type RawProductDetail = Omit<ShopifyProductDetail, "images" | "variants"> & {
    images: { edges: { node: ShopifyImage }[] };
    variants: { edges: { node: ShopifyProductVariant }[] };
  };

  const data = await shopifyFetch<{
    product: RawProductDetail | null;
  }>({
    query,
    variables: { handle },
    tags: ["products", `product-${handle}`],
  });

  if (!data.product) return null;

  return {
    ...data.product,
    images: data.product.images.edges.map((edge) => edge.node),
    variants: data.product.variants.edges.map((edge) => edge.node),
  };
}

export async function getCollectionByHandle(
  handle: string,
  first = 24
): Promise<ShopifyCollection | null> {
  const query = /* GraphQL */ `
    query getCollectionByHandle($handle: String!, $first: Int!) {
      collection(handle: $handle) {
        id
        handle
        title
        description
        image {
          url
          altText
          width
          height
        }
        products(first: $first) {
          edges {
            node {
              id
              handle
              title
              featuredImage {
                url
                altText
                width
                height
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  `;

  type RawCollection = Omit<ShopifyCollection, "products"> & {
    products: { edges: { node: ShopifyProduct }[] };
  };

  const data = await shopifyFetch<{
    collection: RawCollection | null;
  }>({
    query,
    variables: { handle, first },
    tags: ["collections", `collection-${handle}`],
  });

  if (!data.collection) return null;

  return {
    ...data.collection,
    products: data.collection.products.edges.map((edge) => edge.node),
  };
}

export async function getArticles(first = 6): Promise<ShopifyArticle[]> {
  const query = /* GraphQL */ `
    query getArticles($first: Int!) {
      articles(first: $first, sortKey: PUBLISHED_AT, reverse: true) {
        edges {
          node {
            id
            handle
            title
            excerpt
            contentHtml
            publishedAt
            tags
            authorV2 {
              name
            }
            image {
              url
              altText
              width
              height
            }
            blog {
              handle
              title
            }
            seo {
              title
              description
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    articles: { edges: { node: ShopifyArticle }[] };
  }>({
    query,
    variables: { first },
    tags: ["articles"],
  });

  return data.articles.edges.map((edge) => edge.node);
}

export async function getArticleByHandle(
  blogHandle: string,
  articleHandle: string
): Promise<ShopifyArticle | null> {
  const query = /* GraphQL */ `
    query getArticleByHandle($blogHandle: String!, $articleHandle: String!) {
      blog(handle: $blogHandle) {
        articleByHandle(handle: $articleHandle) {
          id
          handle
          title
          excerpt
          contentHtml
          publishedAt
          tags
          authorV2 {
            name
          }
          image {
            url
            altText
            width
            height
          }
          blog {
            handle
            title
          }
          seo {
            title
            description
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    blog: { articleByHandle: ShopifyArticle | null } | null;
  }>({
    query,
    variables: { blogHandle, articleHandle },
    tags: ["articles", `article-${articleHandle}`],
  });

  return data.blog?.articleByHandle ?? null;
}

export async function getBlogByHandle(
  handle: string,
  first = 24
): Promise<ShopifyBlog | null> {
  const query = /* GraphQL */ `
    query getBlogByHandle($handle: String!, $first: Int!) {
      blog(handle: $handle) {
        handle
        title
        seo {
          title
          description
        }
        articles(first: $first, sortKey: PUBLISHED_AT, reverse: true) {
          edges {
            node {
              id
              handle
              title
              excerpt
              contentHtml
              publishedAt
              tags
              authorV2 {
                name
              }
              image {
                url
                altText
                width
                height
              }
              blog {
                handle
                title
              }
              seo {
                title
                description
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    blog: {
      handle: string;
      title: string;
      seo: { title: string | null; description: string | null } | null;
      articles: { edges: { node: ShopifyArticle }[] };
    } | null;
  }>({
    query,
    variables: { handle, first },
    tags: ["articles", `blog-${handle}`],
  });

  if (!data.blog) return null;

  return {
    handle: data.blog.handle,
    title: data.blog.title,
    seo: data.blog.seo,
    articles: data.blog.articles.edges.map((edge) => edge.node),
  };
}
export type ShopifyCollectionSummary = {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: ShopifyImage | null;
};

export async function getCollections(
  first = 12
): Promise<ShopifyCollectionSummary[]> {
  const query = /* GraphQL */ `
    query getCollections($first: Int!) {
      collections(first: $first) {
        edges {
          node {
            id
            handle
            title
            description
            image {
              url
              altText
              width
              height
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    collections: { edges: { node: ShopifyCollectionSummary }[] };
  }>({
    query,
    variables: { first },
    tags: ["collections"],
  });

  return data.collections.edges.map((edge) => edge.node);
}