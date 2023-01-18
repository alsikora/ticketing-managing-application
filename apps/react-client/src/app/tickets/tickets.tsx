import { useState, ChangeEvent, useEffect } from "react";
import { Ticket } from '@acme/shared-models';
import Modal from '../components/modal/modal';
import TicketItem from './ticketItem';
import { createTicket, getAllTickets } from '../api';
import StatusFilter from './statusFilter';
import { logger } from 'nx/src/utils/logger';

export interface TicketsProps {
}

export function Tickets(props: TicketsProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [tickets, setTickets] = useState([] as Ticket[]);
  const [showModal, setShowModal] = useState(false);
  const [newTicketDescription, setNewTicketDescription] = useState('');
  const [ticketsToDisplay, setTicketToDisplay] = useState([] as Ticket[]);
  const [filterText, setFilterText] = useState('');
  const [showStatus, setShowStatus] = useState('');

  async function fetchTickets() {
    const tickets = await getAllTickets();

    if (tickets.statusCode && tickets.statusCode !== 200) {
      setTickets([]);
      setTicketToDisplay([]);
    } else {
      setTickets(tickets);
      setTicketToDisplay(tickets);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleCancel = () => {
    setShowModal(false);
    setNewTicketDescription('');
  }
  const handleSave = () => {
    setIsLoading(true);
    createTicket(newTicketDescription).then(data => {
      fetchTickets();
    });
    setShowModal(false);
    setNewTicketDescription('');
  }

  const handleShowAll = () => {
    setTicketToDisplay(tickets);
  }
  const handleShowComplete = () => {
    setTicketToDisplay(ticketsToDisplay.filter(t => t.completed))

  }
  const handleShowIncomplete = () => {
    setTicketToDisplay(ticketsToDisplay.filter(t => !t.completed))
  }

  const filterTickets = (text: string) => {
    setFilterText(text);
    setTicketToDisplay(ticketsToDisplay.filter(t => t.description.indexOf(filterText) > -1))
  }

  return (
      <>
        <div className="px-4 py-5 sm:px-6 inline-flex items-center justify-between w-full">
          <h2 className="text-xl font-bold leading-tight tracking-tight text-sky-500">Tickets</h2>
          <StatusFilter showAll={handleShowAll} showComplete={handleShowComplete}
                        showIncomplete={handleShowIncomplete}/>
          <input value={filterText} onChange={(e: ChangeEvent<HTMLInputElement>) => filterTickets(e.target.value)}/>
          <button type="button"
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center rounded-md border border-transparent bg-sky-500 px-4 py-2 text-sm font-medium text-white">
            Create new ticket
          </button>
        </div>
        <div className="px-4 py-5 sm:p-6">
          {isLoading ? 'Loading...' :
              <div className="overflow-hidden bg-white shadow sm:rounded-md">
                <ul role="list" className="divide-y divide-gray-200">
                  {ticketsToDisplay.map((t) => (
                      <TicketItem key={t.id} ticket={t}/>
                  ))}
                </ul>
              </div>
          }
        </div>
        {showModal && <Modal title={"Add new ticket"}
                             handleSave={handleSave}
                             handleCancel={handleCancel}>
          <form>
            <label htmlFor="description" className="inline-block text-sm font-medium text-gray-700">Description:</label>
            <div className="mt-1 ml-5 inline-block">
              <input type="text" name="description" id="description"
                     className="inline-block w-full rounded-md border-sky-100 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                     placeholder="Enter description"
                     value={newTicketDescription}
                     onChange={(e: ChangeEvent<HTMLInputElement>) => setNewTicketDescription(e.target.value)}/>
            </div>
          </form>
        </Modal>}
      </>
  );
}

export default Tickets;
