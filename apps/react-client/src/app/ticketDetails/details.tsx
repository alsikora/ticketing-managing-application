import { useParams } from 'react-router-dom';
import { Ticket, User } from '@acme/shared-models';
import { ChangeEvent, useEffect, useState } from 'react';
import { assignTicket, getTicket, markAsComplete } from '../api';
import Select from '../components/select/select';

export interface TicketDetailsProps {
  users: User[];
}

export function TicketDetails(props: TicketDetailsProps) {
  const [ticket, setTicket] = useState({} as Ticket);
  const [isLoading, setIsLoading] = useState(true);
  let {id} = useParams<{ id: string }>();
  useEffect(() => {
    getTicket(parseInt(id!, 10)).then(ticket => {
      setTicket(ticket);
      setIsLoading(false);
    });
  }, []);

  const completeTicket = () => {
    setIsLoading(true);
    markAsComplete(ticket.id).then(() => {
      getTicket(parseInt(id!, 10)).then(ticket => {
        setTicket(ticket);
        setIsLoading(false);
      });
    })
  }

  const getAssigneeName = (id: number): string => {
    const user = props.users.find(user => id === user.id);
    return user ? user.name : 'Unknown user';
  }

  const incompleteStatus = () => {
    return (<>
          Incomplete
          <button key={ticket.id}
                  type="button"
                  onClick={completeTicket}
                  className="ml-4 inline-flex items-center rounded-md border border-transparent bg-sky-500 px-4 py-2 text-sm font-medium text-white">Mark
            as complete</button>
        </>
    );
  }

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const index = e.target.selectedIndex;
    const el = e.target.children[index];
    const userId = el.getAttribute('id');
    if (!userId) {
      return; // todo handle error
    }
    assignTicket(ticket.id, parseInt(userId, 10)).then()
  }

  return (
      <>
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-xl font-bold leading-tight tracking-tight text-sky-500">Details</h2>
        </div>
        <div className="px-4 py-5 sm:p-6">
          {isLoading ? 'Loading...' :
              <div className="w-[50%] grid grid-cols-2 gap-4">
                <h3 className="font-semibold text-xl">Ticket ID:</h3>
                <p>{ticket.id}</p>

                <h3 className="font-semibold text-xl">Description:</h3>
                <p>{ticket.description}</p>

                <h3 className="font-semibold text-xl">Assignee:</h3>
                <p>{ticket.assigneeId ? getAssigneeName(ticket.assigneeId) :
                    <Select displayKey={'name'} list={props.users} handleChange={handleChange}/>}</p>

                <h3 className="font-semibold text-xl">Status:</h3>
                <p>{ticket.completed ? 'Complete' : (incompleteStatus())}</p>
              </div>
          }
        </div>
      </>
  );
}

export default TicketDetails;
