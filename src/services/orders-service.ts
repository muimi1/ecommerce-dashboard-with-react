
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from './api-service';

export interface OrderResponse {
  id: string;
  order_number: string;
  customer_name: string;
  created_at: string;
  total: number;
  order_status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  payment_status: "pending" | "paid" | "failed" | "refunded";
  items_count: number;
}

export interface OrdersApiResponse {
  data: OrderResponse[];
  meta: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
}

// Adapter to transform API data to our Order model
export const adaptOrderFromApi = (apiOrder: OrderResponse): Order => ({
  id: apiOrder.id,
  orderNumber: apiOrder.order_number,
  customer: apiOrder.customer_name,
  date: apiOrder.created_at,
  total: apiOrder.total,
  status: apiOrder.order_status,
  paymentStatus: apiOrder.payment_status,
  items: apiOrder.items_count,
});

// Function to fetch orders with optional filters
export const fetchOrders = async (
  page = 1, 
  limit = 10, 
  search?: string
): Promise<OrdersApiResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(search ? { search } : {})
  });
  
  const response = await api.get(`/orders?${params.toString()}`);
  return response.data;
};

// Hook to get orders with React Query
export const useOrders = (page = 1, limit = 10, search = '') => {
  return useQuery({
    queryKey: ['orders', page, limit, search],
    queryFn: () => fetchOrders(page, limit, search),
  });
};

// Function to update an order status
export const updateOrderStatus = async (
  orderId: string, 
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
) => {
  const response = await api.put(`/orders/${orderId}`, { status });
  return response.data;
};

// Hook to update order status with React Query
export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ orderId, status }: { orderId: string, status: "pending" | "processing" | "shipped" | "delivered" | "cancelled" }) => 
      updateOrderStatus(orderId, status),
    onSuccess: () => {
      // Invalidate and refetch orders queries
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

// Function to get a single order details
export const fetchOrderDetails = async (id: string) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

// Hook to get a single order with React Query
export const useOrderDetails = (id: string) => {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => fetchOrderDetails(id),
    enabled: !!id, // Only run the query if we have an ID
  });
};

// Re-export the Order type from the OrdersPage
export interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  date: string;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  items: number;
}
