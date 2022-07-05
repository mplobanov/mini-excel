/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_create_upload_file_upload_post } from '../models/Body_create_upload_file_upload_post';
import type { FileId } from '../models/FileId';
import type { FilterGroup } from '../models/FilterGroup';
import type { Table } from '../models/Table';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

    /**
     * Root
     * @returns any Successful Response
     * @throws ApiError
     */
    public static rootGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/',
        });
    }

    /**
     * Say Hello
     * @param name
     * @returns any Successful Response
     * @throws ApiError
     */
    public static sayHelloHelloNameGet(
        name: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/hello/{name}',
            path: {
                'name': name,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Example
     * @returns Table Successful Response
     * @throws ApiError
     */
    public static getExampleExampleGet(): CancelablePromise<Table> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/example',
        });
    }

    /**
     * Create Upload File
     * @param formData
     * @returns FileId Successful Response
     * @throws ApiError
     */
    public static createUploadFileUploadPost(
        formData: Body_create_upload_file_upload_post,
    ): CancelablePromise<FileId> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/upload',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get File
     * @param fileId
     * @param limit
     * @param requestBody
     * @returns Table Successful Response
     * @throws ApiError
     */
    public static getFileFileIdPost(
        fileId: string,
        limit: number = 20,
        requestBody?: FilterGroup,
    ): CancelablePromise<Table> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/{file_id}',
            path: {
                'file_id': fileId,
            },
            query: {
                'limit': limit,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
