import { Menu } from './menu.model';

export const verticalMenuItems_member = [ 
    new Menu (1000, 'Home', '/home', null, 'keyboard-o', null, false, 0),

    new Menu (2000, 'Profile', '', null, 'keyboard-o', null, false, 0),
    new Menu (2001, 'Profile', '/profile', null, 'keyboard-o', null, true, 2000),    
    new Menu (2002, 'Transfers List', '/transfer', null, 'keyboard-o', null, true, 2000),

    new Menu (3000, 'Bets', '', null, 'keyboard-o', null, true, 0),
    new Menu (3001, 'Bets List', '/bets-list', null, 'keyboard-o', null, false, 3000),
    new Menu (3002, 'Bets Report', '/bets-report', null, 'keyboard-o', null, false, 3000),
    new Menu (3003, 'Results', '/results', null, 'keyboard-o', null, false, 3000),        
]

export const horizontalMenuItems_member = [ 
    new Menu (1000, 'Home', '/home', null, 'keyboard-o', null, false, 0),
    new Menu (2000, 'Profile', '', null, 'keyboard-o', null, true, 0),
    new Menu (2001, 'Profile', '/profile', null, 'keyboard-o', null, false, 2000),    
    new Menu (2002, 'Transfers List', '/transfer', null, 'keyboard-o', null, false, 2000),

    new Menu (3000, 'Bets', '', null, 'keyboard-o', null, true, 0),
    new Menu (3001, 'Bets List', '/bets-list', null, 'keyboard-o', null, false, 3000),
    new Menu (3002, 'Bets Report', '/bets-report', null, 'keyboard-o', null, false, 3000),
    new Menu (3003, 'Results', '/results', null, 'keyboard-o', null, false, 3000),        
]

export const horizontalMenuItems_Admin = [ 
    new Menu (1000, 'Home', '/home', null, 'keyboard-o', null, false, 0),
    new Menu (2000, 'Profile', '', null, 'keyboard-o', null, true, 0),
    new Menu (2001, 'Profile', '/profile', null, 'keyboard-o', null, false, 2000),        

    new Menu (6000, 'Matches', null, null, 'keyboard-o', null, true, 0),
    new Menu (6001, 'Latest', 'backoffice/fixtures/latest-result', null, 'keyboard-o', null, false, 6000),    
    new Menu (6002, 'New Program', 'backoffice/fixtures/new-prog', null, 'keyboard-o', null, false, 6000),        
    new Menu (6003, 'Define Result', 'backoffice/fixtures/define-result', null, 'keyboard-o', null, false, 6000),      
    new Menu (6004, 'Define Prize', 'backoffice/fixtures/define-prize', null, 'keyboard-o', null, false, 6000),

    new Menu (7000, 'Options', null, null, 'keyboard-o', null, true, 0),    
    new Menu (7001, 'Options', 'backoffice/options/options', null, 'keyboard-o', null, false, 7000),    
    new Menu (7002, 'Groups', 'backoffice/options/groups', null, 'keyboard-o', null, false, 7000),    
    new Menu (7003, 'Option Groups', 'backoffice/options/option-groups', null, 'keyboard-o', null, false, 7000),    

    new Menu (8000, 'Bets', null, null, 'keyboard-o', null, true, 0),    
    new Menu (8001, 'Bet List', 'backoffice/bets/bet-list', null, 'keyboard-o', null, false, 8000),
    new Menu (8002, 'Bet Report', 'backoffice/bets/bet-report', null, 'keyboard-o', null, false, 8000),    
    new Menu (8003, 'Report od Bettors', 'backoffice/bets/bettor-report', null, 'keyboard-o', null, false, 8000),

    new Menu (9000, 'Clinets', null, null, 'keyboard-o', null, true, 0),
    new Menu (9001, 'Operator', 'backoffice/clients/operator', null, 'keyboard-o', null, false, 9000),
    new Menu (9002, 'Agency', 'backoffice/clients/agency', null, 'keyboard-o', null, false, 9000),    
    new Menu (9003, 'User', 'backoffice/clients/user', null, 'keyboard-o', null, false, 9000),        

    new Menu (9800, 'Transfers', null, null, 'keyboard-o', null, true, 0),
    new Menu (9801, 'Transfer List', 'backoffice/transfers/transfer-list', null, 'keyboard-o', null, false, 9800),
    new Menu (9802, 'Transfer', 'backoffice/transfers/transfer', null, 'keyboard-o', null, false, 9800),


    new Menu (9900, 'Maintain', null, null, 'keyboard-o', null, true, 0),
    new Menu (9901, 'Database', 'backoffice/maintain/database', null, 'keyboard-o', null, false, 9900),
    new Menu (9902, 'Setting', 'backoffice/maintain/setting', null, 'keyboard-o', null, false, 9900),
    new Menu (9903, 'Bet Bonus', 'backoffice/maintain/bonus', null, 'keyboard-o', null, false, 9900),
    new Menu (9904, 'Odd Limits', 'backoffice/maintain/oddlimit', null, 'keyboard-o', null, false, 9900),  
    new Menu (9905, 'Commissions', 'backoffice/maintain/commission', null, 'keyboard-o', null, false, 9900),
]



export const horizontalMenuItems_Operator = [ 

    new Menu (1000, 'Home', '/home', null, 'keyboard-o', null, false, 0),
    new Menu (2000, 'Profile', '', null, 'keyboard-o', null, true, 0),
    new Menu (2001, 'Profile', '/profile', null, 'keyboard-o', null, false, 2000),        


    new Menu (6000, 'Matches', null, null, 'keyboard-o', null, true, 0),
    new Menu (6001, 'Latest', 'backoffice/fixtures/latest-result', null, 'keyboard-o', null, false, 6000),

    new Menu (8000, 'Bets', null, null, 'keyboard-o', null, true, 0),    
    new Menu (8001, 'Bet List', 'backoffice/bets/bet-list', null, 'keyboard-o', null, false, 8000),
    new Menu (8002, 'Bet Report', 'backoffice/bets/bet-report', null, 'keyboard-o', null, false, 8000),    
    new Menu (8003, 'Report od Bettors', 'backoffice/bets/bettor-report', null, 'keyboard-o', null, false, 8000),

    new Menu (9800, 'Transfers', null, null, 'keyboard-o', null, true, 0),
    new Menu (9801, 'Transfer List', 'backoffice/transfers/transfer-list', null, 'keyboard-o', null, false, 9800),
    new Menu (9802, 'Transfer', 'backoffice/transfers/transfer', null, 'keyboard-o', null, false, 9800),

    new Menu (9000, 'Clinets', null, null, 'keyboard-o', null, true, 0),
    new Menu (9002, 'Agency', 'backoffice/clients/agency', null, 'keyboard-o', null, false, 9000),    
    new Menu (9003, 'User', 'backoffice/clients/user', null, 'keyboard-o', null, false, 9000),
]

export const horizontalMenuItems_Agency = [ 
    new Menu (1000, 'Home', '/home', null, 'keyboard-o', null, false, 0),

    new Menu (2000, 'Profile', '', null, 'keyboard-o', null, false, 0),
    new Menu (2001, 'Profile', '/profile', null, 'keyboard-o', null, true, 2000),    
    new Menu (2002, 'Transfers List', '/transfer', null, 'keyboard-o', null, true, 2000),

    new Menu (3000, 'Bets', '', null, 'keyboard-o', null, true, 0),
    new Menu (3001, 'Bets List', '/bets-list', null, 'keyboard-o', null, false, 3000),
    new Menu (3002, 'Bets Report', '/bets-report', null, 'keyboard-o', null, false, 3000),
    new Menu (3003, 'Results', '/results', null, 'keyboard-o', null, false, 3000),        


    new Menu (6000, 'Matches', null, null, 'keyboard-o', null, true, 0),
    new Menu (6001, 'Latest', 'backoffice/fixtures/latest-result', null, 'keyboard-o', null, false, 6000),

    new Menu (3101, 'Bets', null, null, 'keyboard-o', null, true, 0),    
    new Menu (3102, 'Bet List', '/bets/bet-list', null, 'keyboard-o', null, false, 3101),
    new Menu (3103, 'Bet Report', '/bets/bet-report', null, 'keyboard-o', null, false, 3101),    
    new Menu (3104, 'Report od Bettors', '/bets/bettor-report', null, 'keyboard-o', null, false, 3101),

    new Menu (8000, 'Bets', null, null, 'keyboard-o', null, true, 0),    
    new Menu (8001, 'Bet List', 'backoffice/bets/bet-list', null, 'keyboard-o', null, false, 8000),
    new Menu (8002, 'Bet Report', 'backoffice/bets/bet-report', null, 'keyboard-o', null, false, 8000),    
    new Menu (8003, 'Report od Bettors', 'backoffice/bets/bettor-report', null, 'keyboard-o', null, false, 8000),

    new Menu (9000, 'Clinets', null, null, 'keyboard-o', null, true, 0),
    new Menu (9003, 'User', 'backoffice/clients/user', null, 'keyboard-o', null, false, 9000),

    new Menu (9800, 'Transfers', null, null, 'keyboard-o', null, true, 0),
    new Menu (9801, 'Transfer List', 'backoffice/transfers/transfer-list', null, 'keyboard-o', null, false, 9800),
    new Menu (9802, 'Transfer', 'backoffice/transfers/transfer', null, 'keyboard-o', null, false, 9800),
]





export const verticalMenuItems_guest = [ 
    new Menu (1000, 'Home', '/home', null, 'keyboard-o', null, false, 0),
]

export const horizontalMenuItems_guest = [ 
    new Menu (1000, 'Home', '/home', null, 'keyboard-o', null, false, 0),
]