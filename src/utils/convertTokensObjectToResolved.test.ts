import convertTokensObjectToResolved from './convertTokensObjectToResolved';

describe('convertTokensObjectToResolved', () => {
    it('converts object-like unresolved tokens to resolved object', () => {
        const tokens = {
            global: {
                colors: {
                    red: {
                        value: '#ff0000',
                        type: 'color',
                    },
                    blue: {
                        value: '#0000ff',
                        type: 'color',
                    },
                },
                sizing: {
                    scale: {
                        value: '2',
                        type: 'spacing',
                    },
                    xs: {
                        value: '4',
                        type: 'spacing',
                    },
                    sm: {
                        value: '{sizing.xs} * {sizing.scale}',
                        type: 'spacing',
                    },
                },
            },
            theme: {
                colors: {
                    primary: {
                        value: '$colors.red',
                        type: 'color',
                    },
                },
                sizing: {
                    scale: {
                        value: '3',
                        type: 'spacing',
                    },
                    xs: {
                        value: '6',
                        type: 'spacing',
                    },
                    sm: {
                        value: '{sizing.xs} * {sizing.scale}',
                        type: 'spacing',
                    },
                },
            },
        };

        expect(convertTokensObjectToResolved(tokens)).toEqual({
            global: {
                colors: {
                    red: {
                        value: '#ff0000',
                        type: 'color',
                    },
                    blue: {
                        value: '#0000ff',
                        type: 'color',
                    },
                },
                sizing: {
                    scale: {
                        value: 2,
                        type: 'spacing',
                    },
                    xs: {
                        value: 4,
                        type: 'spacing',
                    },
                    sm: {
                        value: 8,
                        type: 'spacing',
                    },
                },
            },
            theme: {
                colors: {
                    primary: {
                        value: '#ff0000',
                        type: 'color',
                    },
                },
                sizing: {
                    scale: {
                        value: 3,
                        type: 'spacing',
                    },
                    xs: {
                        value: 6,
                        type: 'spacing',
                    },
                    // TODO: confirm if this is indeed the expected value
                    sm: {
                        value: 8,
                        type: 'spacing',
                    },
                },
            },
        });
    });

    it('respects used sets', () => {
        const tokens = {
            global: {
                colors: {
                    white: {
                        value: '#ffffff',
                        type: 'color',
                    },
                    black: {
                        value: '#000000',
                        type: 'color',
                    },
                },
            },
            light: {
                colors: {
                    background: {
                        value: '$colors.white',
                        type: 'color',
                    },
                },
            },
            dark: {
                colors: {
                    background: {
                        value: '$colors.black',
                        type: 'color',
                    },
                },
            },
        };

        expect(convertTokensObjectToResolved(tokens, ['global', 'light'])).toEqual({
            global: {
                colors: {
                    white: {
                        value: '#ffffff',
                        type: 'color',
                    },
                    black: {
                        value: '#000000',
                        type: 'color',
                    },
                },
            },
            light: {
                colors: {
                    background: {
                        value: '#ffffff',
                        type: 'color',
                    },
                },
            },
        });
    });
});
