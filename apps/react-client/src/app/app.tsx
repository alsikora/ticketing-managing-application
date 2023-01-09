import { useEffect, useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { User } from '@acme/shared-models';

import styles from './app.module.css';
import Tickets from './tickets/tickets';
import TicketDetails from './ticketDetails/details';

const App = () => {
  const [users, setUsers] = useState([] as User[]);

  // Very basic way to synchronize state with server.
  // Feel free to use any state/fetch library you want (e.g. react-query, xstate, redux, etc.).
  useEffect(() => {
    async function fetchUsers() {
      const data = await fetch('/api/users').then();
      setUsers(await data.json());
    }

    fetchUsers();
  }, []);

  return (
    <div className={styles['app']}>
      <div className="min-h-full">
        <nav className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <img alt="Nx" className="max-h-[29px]"
                       src="https://uptime-storage.s3.amazonaws.com/logos/87dc009f5a7e7beadaefa58b186264ab.png"/>
                </div>
                <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                  <NavLink to="/"
                     className={({ isActive }) => `${isActive ? 'border-sky-500' : ''} text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>Dashboard</NavLink>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="py-10">
          <header>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Ticketing App</h1>
            </div>
          </header>
          <main>
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="px-4 py-8 sm:px-0">
                <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
                  <Routes>
                    <Route path="/" element={<Tickets />} />
                    <Route path="/:id" element={<TicketDetails users={users}/> } />
                  </Routes>

                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
