import { Ticket } from '@acme/shared-models';

export async function createTicket(description: string) {
  const response = await fetch('/api/tickets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({description})
  });
  return response.json();
}

export async function assignTicket(ticketId: number, userId: number) {
  const response = await fetch(`/api/tickets/${ticketId}/assign/${userId}`, {
    method: 'PUT',
  });
  return response;
}

export async function markAsComplete(id: number) {
  const response = await fetch(` /api/tickets/${id}/complete`, {
    method: 'PUT',
  });
  return response;
}

export async function getAllTickets() {
  const response = await fetch('/api/tickets');
  return response.json();
}

export async function getTicket(id: number) {
  // workaround because /api/tickets/:id doesn't work
  const response = await getAllTickets();
  return response.find((t: Ticket) => id === t.id);
}