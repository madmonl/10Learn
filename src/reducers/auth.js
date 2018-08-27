export default (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                uid: action.uid
            };

        case 'LOGOUT':
            return {};

        case 'GUEST_LOGIN':
            return { guest: true };

        case 'GUEST_LOGOUT':
            return { guest: false };
            
        default:
            return state;
    }
};
