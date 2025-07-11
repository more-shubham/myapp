import {
  getCountries as dbGetCountries,
  getEvent as dbGetEvent,
  getEventOrders as dbGetEventOrders,
  getEvents as dbGetEvents,
  getOrder as dbGetOrder,
  getOrders as dbGetOrders,
  getRecentOrders as dbGetRecentOrders,
} from '@/lib/database'

export async function getOrder(id: string) {
  const order = await dbGetOrder(id)
  if (!order) return null

  return {
    id: order.id,
    url: `/orders/${order.id}`,
    date: order.date,
    amount: {
      usd: order.amountUsd,
      cad: order.amountCad,
      fee: order.fee,
      net: order.net,
    },
    payment: {
      transactionId: order.transactionId,
      card: {
        number: order.payment?.cardNumber || '',
        type: order.payment?.cardType || '',
        expiry: order.payment?.cardExpiry || '',
      },
    },
    customer: {
      name: order.customer.name,
      email: order.customer.email,
      address: order.customer.address,
      country: order.customer.country,
      countryFlagUrl: order.customer.flagUrl,
    },
    event: {
      id: order.event.id,
      name: order.event.name,
      url: `/events/${order.event.id}`,
      date: order.event.date,
      time: order.event.time,
      location: order.event.location,
      totalRevenue: order.event.totalRevenue,
      totalRevenueChange: order.event.totalRevenueChange,
      ticketsAvailable: order.event.ticketsAvailable,
      ticketsSold: order.event.ticketsSold,
      ticketsSoldChange: order.event.ticketsSoldChange,
      pageViews: order.event.pageViews,
      pageViewsChange: order.event.pageViewsChange,
      status: order.event.status,
      imgUrl: order.event.imgUrl,
      thumbUrl: order.event.thumbUrl,
    },
  }
}

export async function getRecentOrders() {
  const orders = await dbGetRecentOrders()
  return orders.map((order) => ({
    id: order.id,
    url: `/orders/${order.id}`,
    date: order.date,
    amount: {
      usd: order.amountUsd,
      cad: order.amountCad,
      fee: order.fee,
      net: order.net,
    },
    payment: {
      transactionId: order.transactionId,
      card: {
        number: order.payment?.cardNumber || '',
        type: order.payment?.cardType || '',
        expiry: order.payment?.cardExpiry || '',
      },
    },
    customer: {
      name: order.customer.name,
      email: order.customer.email,
      address: order.customer.address,
      country: order.customer.country,
      countryFlagUrl: order.customer.flagUrl,
    },
    event: {
      id: order.event.id,
      name: order.event.name,
      url: `/events/${order.event.id}`,
      date: order.event.date,
      time: order.event.time,
      location: order.event.location,
      totalRevenue: order.event.totalRevenue,
      totalRevenueChange: order.event.totalRevenueChange,
      ticketsAvailable: order.event.ticketsAvailable,
      ticketsSold: order.event.ticketsSold,
      ticketsSoldChange: order.event.ticketsSoldChange,
      pageViews: order.event.pageViews,
      pageViewsChange: order.event.pageViewsChange,
      status: order.event.status,
      imgUrl: order.event.imgUrl,
      thumbUrl: order.event.thumbUrl,
    },
  }))
}

export async function getOrders() {
  const orders = await dbGetOrders()
  return orders.map((order) => ({
    id: order.id,
    url: `/orders/${order.id}`,
    date: order.date,
    amount: {
      usd: order.amountUsd,
      cad: order.amountCad,
      fee: order.fee,
      net: order.net,
    },
    payment: {
      transactionId: order.transactionId,
      card: {
        number: order.payment?.cardNumber || '',
        type: order.payment?.cardType || '',
        expiry: order.payment?.cardExpiry || '',
      },
    },
    customer: {
      name: order.customer.name,
      email: order.customer.email,
      address: order.customer.address,
      country: order.customer.country,
      countryFlagUrl: order.customer.flagUrl,
    },
    event: {
      id: order.event.id,
      name: order.event.name,
      url: `/events/${order.event.id}`,
      date: order.event.date,
      time: order.event.time,
      location: order.event.location,
      totalRevenue: order.event.totalRevenue,
      totalRevenueChange: order.event.totalRevenueChange,
      ticketsAvailable: order.event.ticketsAvailable,
      ticketsSold: order.event.ticketsSold,
      ticketsSoldChange: order.event.ticketsSoldChange,
      pageViews: order.event.pageViews,
      pageViewsChange: order.event.pageViewsChange,
      status: order.event.status,
      imgUrl: order.event.imgUrl,
      thumbUrl: order.event.thumbUrl,
    },
  }))
}

export async function getEvents() {
  const events = await dbGetEvents()
  return events.map((event) => ({
    id: event.id,
    name: event.name,
    url: `/events/${event.id}`,
    date: event.date,
    time: event.time,
    location: event.location,
    totalRevenue: event.totalRevenue,
    totalRevenueChange: event.totalRevenueChange,
    ticketsAvailable: event.ticketsAvailable,
    ticketsSold: event.ticketsSold,
    ticketsSoldChange: event.ticketsSoldChange,
    pageViews: event.pageViews,
    pageViewsChange: event.pageViewsChange,
    status: event.status,
    imgUrl: event.imgUrl,
    thumbUrl: event.thumbUrl,
  }))
}

export async function getEvent(id: string) {
  const event = await dbGetEvent(id)
  if (!event) return null

  return {
    id: event.id,
    name: event.name,
    url: `/events/${event.id}`,
    date: event.date,
    time: event.time,
    location: event.location,
    totalRevenue: event.totalRevenue,
    totalRevenueChange: event.totalRevenueChange,
    ticketsAvailable: event.ticketsAvailable,
    ticketsSold: event.ticketsSold,
    ticketsSoldChange: event.ticketsSoldChange,
    pageViews: event.pageViews,
    pageViewsChange: event.pageViewsChange,
    status: event.status,
    imgUrl: event.imgUrl,
    thumbUrl: event.thumbUrl,
  }
}

export async function getEventOrders(id: string) {
  const orders = await dbGetEventOrders(id)
  return orders.map((order) => ({
    id: order.id,
    url: `/orders/${order.id}`,
    date: order.date,
    amount: {
      usd: order.amountUsd,
      cad: order.amountCad,
      fee: order.fee,
      net: order.net,
    },
    payment: {
      transactionId: order.transactionId,
      card: {
        number: order.payment?.cardNumber || '',
        type: order.payment?.cardType || '',
        expiry: order.payment?.cardExpiry || '',
      },
    },
    customer: {
      name: order.customer.name,
      email: order.customer.email,
      address: order.customer.address,
      country: order.customer.country,
      countryFlagUrl: order.customer.flagUrl,
    },
    event: {
      id: order.event.id,
      name: order.event.name,
      url: `/events/${order.event.id}`,
      date: order.event.date,
      time: order.event.time,
      location: order.event.location,
      totalRevenue: order.event.totalRevenue,
      totalRevenueChange: order.event.totalRevenueChange,
      ticketsAvailable: order.event.ticketsAvailable,
      ticketsSold: order.event.ticketsSold,
      ticketsSoldChange: order.event.ticketsSoldChange,
      pageViews: order.event.pageViews,
      pageViewsChange: order.event.pageViewsChange,
      status: order.event.status,
      imgUrl: order.event.imgUrl,
      thumbUrl: order.event.thumbUrl,
    },
  }))
}

export async function getCountries() {
  return await dbGetCountries()
}
