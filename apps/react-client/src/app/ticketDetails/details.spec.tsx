import {render} from '@testing-library/react';

import TicketDetails from './details';

describe('TicketDetails', () => {
    it('should render successfully', () => {
        const {baseElement} = render(<TicketDetails
            ticket={{id: 1, description: 'test description', assigneeId: 1, completed: true}}/>);
        expect(baseElement).toBeTruthy();
    });
});
