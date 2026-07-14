import type { CollectionProduct, CollectionProductKind } from "@/types/collection";

export type CollectionCartItem = {
  productId: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
  kind?: CollectionProductKind;
  variant?: string;
};

export const COLLECTION_DELIVERY_FEE = 7;

function storageKey(profileSlug: string) {
  return `inrcliq-collection-cart:${profileSlug}`;
}

export function readCollectionCart(profileSlug: string): CollectionCartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(storageKey(profileSlug));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CollectionCartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeCollectionCart(profileSlug: string, items: CollectionCartItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(storageKey(profileSlug), JSON.stringify(items));
}

export function cartItemCount(items: CollectionCartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function parsePriceAmount(price: string): number {
  const match = price.replace(/,/g, "").match(/(\d+(\.\d+)?)/);
  return match ? Number(match[1]) : 0;
}

export function formatCartMoney(amount: number): string {
  return `$${amount.toFixed(amount % 1 === 0 ? 0 : 2)}`;
}

export function cartSubtotal(items: CollectionCartItem[]): number {
  return items.reduce((sum, item) => sum + parsePriceAmount(item.price) * item.quantity, 0);
}

export function cartNeedsDelivery(items: CollectionCartItem[]): boolean {
  return items.some((item) => (item.kind ?? "physical") === "physical");
}

export function cartDeliveryFee(items: CollectionCartItem[]): number {
  if (items.length === 0 || !cartNeedsDelivery(items)) return 0;
  return COLLECTION_DELIVERY_FEE;
}

export function addProductToCart(
  items: CollectionCartItem[],
  product: CollectionProduct,
  variant?: string,
): CollectionCartItem[] {
  const existing = items.find(
    (item) => item.productId === product.id && (item.variant ?? "") === (variant ?? ""),
  );

  if (existing) {
    return items.map((item) =>
      item.productId === product.id && (item.variant ?? "") === (variant ?? "")
        ? { ...item, quantity: item.quantity + 1, kind: item.kind ?? product.kind }
        : item,
    );
  }

  return [
    ...items,
    {
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      kind: product.kind,
      variant,
    },
  ];
}

export function updateCartQuantity(
  items: CollectionCartItem[],
  productId: string,
  quantity: number,
  variant?: string,
): CollectionCartItem[] {
  if (quantity <= 0) {
    return items.filter(
      (item) => !(item.productId === productId && (item.variant ?? "") === (variant ?? "")),
    );
  }

  return items.map((item) =>
    item.productId === productId && (item.variant ?? "") === (variant ?? "")
      ? { ...item, quantity }
      : item,
  );
}
