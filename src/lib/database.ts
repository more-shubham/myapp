'use server'
import { prisma } from '@/lib/prisma'
import type { Event, Order, Customer, Payment, Country } from '@prisma/client'

export type EventWithOrders = Event & {
  orders: (Order & {
    customer: Customer
    payment: Payment | null
  })[]
}

export type OrderWithDetails = Order & {
  customer: Customer
  event: Event
  payment: Payment | null
}

// Event functions
export async function getEvents(): Promise<Event[]> {
  return await prisma.event.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export async function getEvent(id: string): Promise<Event | null> {
  return await prisma.event.findUnique({
    where: {
      id: parseInt(id)
    }
  })
}

export async function createEvent(data: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Promise<Event> {
  return await prisma.event.create({
    data
  })
}

export async function updateEvent(id: string, data: Partial<Omit<Event, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Event> {
  return await prisma.event.update({
    where: {
      id: parseInt(id)
    },
    data
  })
}

export async function deleteEvent(id: string): Promise<Event> {
  return await prisma.event.delete({
    where: {
      id: parseInt(id)
    }
  })
}

// Order functions
export async function getOrders(): Promise<OrderWithDetails[]> {
  return await prisma.order.findMany({
    include: {
      customer: true,
      event: true,
      payment: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export async function getOrder(id: string): Promise<OrderWithDetails | null> {
  return await prisma.order.findUnique({
    where: {
      id: parseInt(id)
    },
    include: {
      customer: true,
      event: true,
      payment: true
    }
  })
}

export async function getRecentOrders(limit: number = 10): Promise<OrderWithDetails[]> {
  return await prisma.order.findMany({
    include: {
      customer: true,
      event: true,
      payment: true
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: limit
  })
}

export async function getEventOrders(eventId: string): Promise<OrderWithDetails[]> {
  return await prisma.order.findMany({
    where: {
      eventId: parseInt(eventId)
    },
    include: {
      customer: true,
      event: true,
      payment: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export async function createOrder(orderData: {
  date: string
  amountUsd: string
  amountCad: string
  fee: string
  net: string
  transactionId: string
  customerId: number
  eventId: number
  payment?: {
    cardNumber: string
    cardType: string
    cardExpiry: string
  }
}): Promise<OrderWithDetails> {
  const { payment, ...orderInfo } = orderData
  
  return await prisma.order.create({
    data: {
      ...orderInfo,
      payment: payment ? {
        create: payment
      } : undefined
    },
    include: {
      customer: true,
      event: true,
      payment: true
    }
  })
}

// Customer functions
export async function getCustomers(): Promise<Customer[]> {
  return await prisma.customer.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export async function getCustomer(id: string): Promise<Customer | null> {
  return await prisma.customer.findUnique({
    where: {
      id: parseInt(id)
    }
  })
}

export async function getCustomerByEmail(email: string): Promise<Customer | null> {
  return await prisma.customer.findUnique({
    where: {
      email
    }
  })
}

export async function createCustomer(data: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>): Promise<Customer> {
  return await prisma.customer.create({
    data
  })
}

export async function updateCustomer(id: string, data: Partial<Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Customer> {
  return await prisma.customer.update({
    where: {
      id: parseInt(id)
    },
    data
  })
}

// Countries functions
export async function getCountries() {
  return await prisma.country.findMany({
    orderBy: {
      name: 'asc'
    }
  })
}

export async function createCountry(data: Omit<Country, 'id'>) {
  return await prisma.country.create({
    data
  })
}

// Utility functions
export async function seedDatabase() {
  // This function can be used to seed the database with initial data
  // You can call this in a separate script or during development
  console.log('Database seeding functionality ready')
}
