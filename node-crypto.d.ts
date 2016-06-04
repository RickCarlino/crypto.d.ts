declare type Buffer = any;

export interface EventEmitter {
    addListener(event: string, listener: Function): this;
    on(event: string, listener: Function): this;
    once(event: string, listener: Function): this;
    removeListener(event: string, listener: Function): this;
    removeAllListeners(event?: string): this;
    setMaxListeners(n: number): this;
    getMaxListeners(): number;
    listeners(event: string): Function[];
    emit(event: string, ...args: any[]): boolean;
    listenerCount(type: string): number;
}

export interface ReadableStream extends EventEmitter {
    readable: boolean;
    read(size?: number): string|Buffer;
    setEncoding(encoding: string): void;
    pause(): void;
    resume(): void;
    pipe<T extends WritableStream>(destination: T, options?: { end?: boolean; }): T;
    unpipe<T extends WritableStream>(destination?: T): void;
    unshift(chunk: string): void;
    unshift(chunk: Buffer): void;
    wrap(oldStream: ReadableStream): ReadableStream;
}

export interface WritableStream extends EventEmitter {
    writable: boolean;
    write(buffer: Buffer|string, cb?: Function): boolean;
    write(str: string, encoding?: string, cb?: Function): boolean;
    end(): void;
    end(buffer: Buffer, cb?: Function): void;
    end(str: string, cb?: Function): void;
    end(str: string, encoding?: string, cb?: Function): void;
}

export interface ReadWriteStream extends ReadableStream, WritableStream {}

export interface CredentialDetails {
    pfx: string;
    key: string;
    passphrase: string;
    cert: string;
    ca: string | string[];
    crl: string | string[];
    ciphers: string;
}
export interface Credentials { context?: any; }
export function createCredentials(details: CredentialDetails): Credentials;
export function createHash(algorithm: string): Hash;
export function createHmac(algorithm: string, key: string): Hmac;
export function createHmac(algorithm: string, key: Buffer): Hmac;
export interface Hash {
    update(data: any, input_encoding?: string): Hash;
    digest(encoding: 'buffer'): Buffer;
    digest(encoding: string): any;
    digest(): Buffer;
}
export interface Hmac extends ReadWriteStream {
    update(data: any, input_encoding?: string): Hmac;
    digest(encoding: 'buffer'): Buffer;
    digest(encoding: string): any;
    digest(): Buffer;
}
export function createCipher(algorithm: string, password: any): Cipher;
export function createCipheriv(algorithm: string, key: any, iv: any): Cipher;
export interface Cipher extends ReadWriteStream {
    update(data: Buffer): Buffer;
    update(data: string, input_encoding: "utf8"|"ascii"|"binary"): Buffer;
    update(data: Buffer, input_encoding: any, output_encoding: "binary"|"base64"|"hex"): string;
    update(data: string, input_encoding: "utf8"|"ascii"|"binary", output_encoding: "binary"|"base64"|"hex"): string;
    final(): Buffer;
    final(output_encoding: string): string;
    setAutoPadding(auto_padding: boolean): void;
    getAuthTag(): Buffer;
}
export function createDecipher(algorithm: string, password: any): Decipher;
export function createDecipheriv(algorithm: string, key: any, iv: any): Decipher;
export interface Decipher extends ReadWriteStream {
    update(data: Buffer): Buffer;
    update(data: string, input_encoding: "binary"|"base64"|"hex"): Buffer;
    update(data: Buffer, input_encoding: any, output_encoding: "utf8"|"ascii"|"binary"): string;
    update(data: string, input_encoding: "binary"|"base64"|"hex", output_encoding: "utf8"|"ascii"|"binary"): string;
    final(): Buffer;
    final(output_encoding: string): string;
    setAutoPadding(auto_padding: boolean): void;
    setAuthTag(tag: Buffer): void;
}
export function createSign(algorithm: string): Signer;
export interface Signer extends WritableStream {
    update(data: any): void;
    sign(private_key: string, output_format: string): string;
}
export function createVerify(algorith: string): Verify;
export interface Verify extends WritableStream {
    update(data: any): void;
    verify(object: string, signature: string, signature_format?: string): boolean;
}
export function createDiffieHellman(prime_length: number): DiffieHellman;
export function createDiffieHellman(prime: number, encoding?: string): DiffieHellman;
export interface DiffieHellman {
    generateKeys(encoding?: string): string;
    computeSecret(other_public_key: string, input_encoding?: string, output_encoding?: string): string;
    getPrime(encoding?: string): string;
    getGenerator(encoding: string): string;
    getPublicKey(encoding?: string): string;
    getPrivateKey(encoding?: string): string;
    setPublicKey(public_key: string, encoding?: string): void;
    setPrivateKey(public_key: string, encoding?: string): void;
}
export function getDiffieHellman(group_name: string): DiffieHellman;
export function pbkdf2(password: string|Buffer, salt: string|Buffer, iterations: number, keylen: number, callback: (err: Error, derivedKey: Buffer) => any): void;
export function pbkdf2(password: string|Buffer, salt: string|Buffer, iterations: number, keylen: number, digest: string, callback: (err: Error, derivedKey: Buffer) => any): void;
export function pbkdf2Sync(password: string|Buffer, salt: string|Buffer, iterations: number, keylen: number) : Buffer;
export function pbkdf2Sync(password: string|Buffer, salt: string|Buffer, iterations: number, keylen: number, digest: string) : Buffer;
export function randomBytes(size: number): Buffer;
export function randomBytes(size: number, callback: (err: Error, buf: Buffer) =>void ): void;
export function pseudoRandomBytes(size: number): Buffer;
export function pseudoRandomBytes(size: number, callback: (err: Error, buf: Buffer) =>void ): void;
export interface RsaPublicKey {
    key: string;
    padding?: any;
}
export interface RsaPrivateKey {
    key: string;
    passphrase?: string,
    padding?: any;
}
export function publicEncrypt(public_key: string|RsaPublicKey, buffer: Buffer): Buffer
export function privateDecrypt(private_key: string|RsaPrivateKey, buffer: Buffer): Buffer