import {TypographyObject} from './propertyTypes';

export interface TokenProps {
    values: {
        [key: string]: SingleTokenObject[] | TokenObject;
    };
    updatedAt?: string;
    version?: string;
}

export type SingleToken = TokenGroup;

export type NewTokenObject = {
    name: string;
    value: string | TypographyObject | number;
    type: TokenType | string | 'undefined';
    description?: string;
};

export type SingleTokenObject = {
    id: string;
    name: string;
    value: string;
    type: TokenType | string | 'undefined';
    description: string;
};

export interface TokenGroup {
    [key: string]: SingleToken;
}

export interface TokenArrayGroup {
    [key: string]: SingleTokenObject;
}

export interface Tokens {
    [key: string]: TokenObject;
}

export interface TokenObject {
    values: TokenArrayGroup;
    type: 'array' | 'object';
}

export type TokenType =
    | 'color'
    | 'implicit'
    | 'borderRadius'
    | 'sizing'
    | 'spacing'
    | 'text'
    | 'typography'
    | 'opacity'
    | 'borderWidth'
    | 'shadow'
    | 'fontFamilies'
    | 'fontWeights'
    | 'lineHeights'
    | 'fontSizes'
    | 'letterSpacing'
    | 'paragraphSpacing';
