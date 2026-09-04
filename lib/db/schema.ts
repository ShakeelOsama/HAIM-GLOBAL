import {
  pgTable,
  pgEnum,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
  primaryKey,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import type { AdapterAccountType } from "next-auth/adapters";

// ─── Enums ───────────────────────────────────────────────────────────────────

export const userRoleEnum = pgEnum("user_role", ["customer", "admin"]);

export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
  "refunded",
]);

export const paymentStatusEnum = pgEnum("payment_status", [
  "pending",
  "paid",
  "failed",
  "refunded",
]);

export const queryStatusEnum = pgEnum("query_status", [
  "open",
  "in_progress",
  "resolved",
  "closed",
]);

export const queryPriorityEnum = pgEnum("query_priority", [
  "low",
  "normal",
  "high",
]);

// ─── Auth.js required tables ─────────────────────────────────────────────────

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  role: userRoleEnum("role").default("customer").notNull(),
  phone: text("phone"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    primaryKey({ columns: [account.provider, account.providerAccountId] }),
  ]
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => [primaryKey({ columns: [vt.identifier, vt.token] })]
);

// ─── Categories ───────────────────────────────────────────────────────────────

export const categories = pgTable(
  "category",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    description: text("description"),
    image: text("image"),
    parentId: text("parent_id"),
    displayOrder: integer("display_order").default(0).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  },
  (t) => [uniqueIndex("category_slug_idx").on(t.slug)]
);

// ─── Products ─────────────────────────────────────────────────────────────────

export const products = pgTable(
  "product",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    description: text("description"),
    shortDescription: text("short_description"),
    /** Price in cents — avoids float rounding. e.g. $10.99 → 1099 */
    price: integer("price").notNull(),
    /** Crossed-out price for sale display */
    comparePrice: integer("compare_price"),
    /** For internal margin tracking */
    costPrice: integer("cost_price"),
    categoryId: text("category_id").references(() => categories.id),
    sku: text("sku"),
    stock: integer("stock").default(0).notNull(),
    lowStockThreshold: integer("low_stock_threshold").default(5).notNull(),
    /** e.g. "lb", "oz", "each", "pack" */
    unit: text("unit").default("each").notNull(),
    weightOz: integer("weight_oz"),
    /** Array of Cloudinary URLs */
    images: jsonb("images").$type<string[]>().default([]).notNull(),
    /** { calories, protein, carbs, fat, fiber, sodium } */
    nutritionInfo: jsonb("nutrition_info").$type<Record<string, number>>(),
    ingredients: text("ingredients"),
    tags: jsonb("tags").$type<string[]>().default([]).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    isFeatured: boolean("is_featured").default(false).notNull(),
    isOrganic: boolean("is_organic").default(false).notNull(),
    metaTitle: text("meta_title"),
    metaDescription: text("meta_description"),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  },
  (t) => [
    uniqueIndex("product_slug_idx").on(t.slug),
    index("product_category_idx").on(t.categoryId),
    index("product_featured_idx").on(t.isFeatured),
  ]
);

// ─── Addresses ───────────────────────────────────────────────────────────────

export const addresses = pgTable(
  "address",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    label: text("label").default("home"),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    phone: text("phone"),
    street1: text("street1").notNull(),
    street2: text("street2"),
    city: text("city").notNull(),
    state: text("state").notNull(),
    zip: text("zip").notNull(),
    country: text("country").default("US").notNull(),
    isDefault: boolean("is_default").default(false).notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  },
  (t) => [index("address_user_idx").on(t.userId)]
);

// ─── Orders ───────────────────────────────────────────────────────────────────

export const orders = pgTable(
  "order",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
    /** For guest checkout */
    guestEmail: text("guest_email"),
    status: orderStatusEnum("status").default("pending").notNull(),
    /** All money fields in cents */
    subtotal: integer("subtotal").notNull(),
    tax: integer("tax").notNull(),
    shippingCost: integer("shipping_cost").notNull(),
    total: integer("total").notNull(),
    /** Snapshot of address at order time */
    shippingAddress: jsonb("shipping_address")
      .$type<{
        firstName: string;
        lastName: string;
        street1: string;
        street2?: string;
        city: string;
        state: string;
        zip: string;
        country: string;
        phone?: string;
      }>()
      .notNull(),
    billingAddress: jsonb("billing_address").$type<{
      firstName: string;
      lastName: string;
      street1: string;
      street2?: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    }>(),
    paymentStatus: paymentStatusEnum("payment_status").default("pending").notNull(),
    /** Stripe PaymentIntent ID */
    paymentIntentId: text("payment_intent_id"),
    notes: text("notes"),
    trackingNumber: text("tracking_number"),
    trackingCarrier: text("tracking_carrier"),
    shippedAt: timestamp("shipped_at", { mode: "date" }),
    deliveredAt: timestamp("delivered_at", { mode: "date" }),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  },
  (t) => [
    index("order_user_idx").on(t.userId),
    index("order_status_idx").on(t.status),
    index("order_created_idx").on(t.createdAt),
  ]
);

// ─── Order Items ──────────────────────────────────────────────────────────────

export const orderItems = pgTable("order_item", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  orderId: text("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  productId: text("product_id").references(() => products.id, {
    onDelete: "set null",
  }),
  /** Snapshot at order time */
  productName: text("product_name").notNull(),
  productImage: text("product_image"),
  productSku: text("product_sku"),
  /** Price in cents at time of order */
  price: integer("price").notNull(),
  quantity: integer("quantity").notNull(),
  total: integer("total").notNull(),
});

// ─── Reviews ──────────────────────────────────────────────────────────────────

export const reviews = pgTable(
  "review",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    productId: text("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    orderId: text("order_id").references(() => orders.id, {
      onDelete: "set null",
    }),
    rating: integer("rating").notNull(),
    title: text("title"),
    body: text("body"),
    images: jsonb("images").$type<string[]>().default([]).notNull(),
    isVerifiedPurchase: boolean("is_verified_purchase").default(false).notNull(),
    isApproved: boolean("is_approved").default(false).notNull(),
    helpfulCount: integer("helpful_count").default(0).notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  },
  (t) => [
    index("review_product_idx").on(t.productId),
    index("review_user_idx").on(t.userId),
    index("review_approved_idx").on(t.isApproved),
  ]
);

export const reviewHelpful = pgTable(
  "review_helpful",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    reviewId: text("review_id")
      .notNull()
      .references(() => reviews.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.userId, t.reviewId] })]
);

// ─── Support Queries ──────────────────────────────────────────────────────────

export const queries = pgTable(
  "query",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
    email: text("email").notNull(),
    orderId: text("order_id").references(() => orders.id, {
      onDelete: "set null",
    }),
    subject: text("subject").notNull(),
    body: text("body").notNull(),
    status: queryStatusEnum("status").default("open").notNull(),
    priority: queryPriorityEnum("priority").default("normal").notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  },
  (t) => [
    index("query_user_idx").on(t.userId),
    index("query_status_idx").on(t.status),
  ]
);

export const queryReplies = pgTable("query_reply", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  queryId: text("query_id")
    .notNull()
    .references(() => queries.id, { onDelete: "cascade" }),
  userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
  body: text("body").notNull(),
  isStaff: boolean("is_staff").default(false).notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

// ─── Wishlist ─────────────────────────────────────────────────────────────────

export const wishlist = pgTable(
  "wishlist_item",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    productId: text("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.productId] })]
);

// ─── Relations ────────────────────────────────────────────────────────────────

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  orders: many(orders),
  addresses: many(addresses),
  reviews: many(reviews),
  queries: many(queries),
  wishlist: many(wishlist),
}));

export const categoriesRelations = relations(categories, ({ many, one }) => ({
  products: many(products),
  parent: one(categories, {
    fields: [categories.parentId],
    references: [categories.id],
    relationName: "subcategories",
  }),
  subcategories: many(categories, { relationName: "subcategories" }),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  orderItems: many(orderItems),
  reviews: many(reviews),
  wishlist: many(wishlist),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, { fields: [orders.userId], references: [users.id] }),
  items: many(orderItems),
  reviews: many(reviews),
  queries: many(queries),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, { fields: [orderItems.orderId], references: [orders.id] }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}));

export const reviewsRelations = relations(reviews, ({ one, many }) => ({
  user: one(users, { fields: [reviews.userId], references: [users.id] }),
  product: one(products, {
    fields: [reviews.productId],
    references: [products.id],
  }),
  order: one(orders, { fields: [reviews.orderId], references: [orders.id] }),
  helpful: many(reviewHelpful),
}));

export const queriesRelations = relations(queries, ({ one, many }) => ({
  user: one(users, { fields: [queries.userId], references: [users.id] }),
  order: one(orders, { fields: [queries.orderId], references: [orders.id] }),
  replies: many(queryReplies),
}));

export const queryRepliesRelations = relations(queryReplies, ({ one }) => ({
  query: one(queries, {
    fields: [queryReplies.queryId],
    references: [queries.id],
  }),
  user: one(users, { fields: [queryReplies.userId], references: [users.id] }),
}));
