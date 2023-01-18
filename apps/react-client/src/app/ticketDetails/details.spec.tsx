import {render} from '@testing-library/react';

import TicketDetails from './details';

describe('TicketDetails', () => {
    it('should render successfully', () => {
        const {baseElement} = render(<TicketDetails users={[{id: 1, name: 'Alex'}]}/>);
        expect(baseElement).toBeTruthy();
    });
});
