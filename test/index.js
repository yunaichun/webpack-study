describe('builder-webpack test case', () => {
    switch (process.env.NODE_ENV) {
        case 'base':
            require('./unit/webpack-base-test');
            break;
        case 'dll':
            require('./unit/webpack-dll-test');
            break;
        case 'prod':
            require('./unit/webpack-prod-test');
            break;
    }
});
