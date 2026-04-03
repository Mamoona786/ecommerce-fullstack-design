export const buildOrderSummary = (orders = []) => {
  return orders.slice(0, 5).map((order) => ({
    orderId: order._id,
    status: order.status,
    totalPrice: order.totalPrice,
    paymentMethod: order.paymentMethod,
    isPaid: order.isPaid,
    paidAt: order.paidAt,
    isDelivered: order.isDelivered,
    deliveredAt: order.deliveredAt,
    items: (order.orderItems || []).map((item) => ({
      title: item.title,
      quantity: item.quantity,
      price: item.price,
    })),
  }));
};

export const buildUserSummary = (user) => {
  if (!user) return null;

  return {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  };
};
