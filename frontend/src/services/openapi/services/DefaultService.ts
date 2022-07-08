/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_create_upload_file_upload_post } from '../models/Body_create_upload_file_upload_post';
import type { FileId } from '../models/FileId';
import type { FilterGroup } from '../models/FilterGroup';
import type { FilterNames } from '../models/FilterNames';
import type { Table } from '../models/Table';
import type { UniqueValues } from '../models/UniqueValues';

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

    /**
     * Get Unique Req
     * @param fileId
     * @param field
     * @param limit
     * @returns UniqueValues Successful Response
     * @throws ApiError
     */
    public static getUniqueReqFileIdUniqueGet(
        fileId: string,
        field: string,
        limit: number = 20,
    ): CancelablePromise<UniqueValues> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/{file_id}/unique}',
            path: {
                'file_id': fileId,
            },
            query: {
                'field': field,
                'limit': limit,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Filters Req
     * @param fileId
     * @param field
     * @returns FilterNames Successful Response
     * @throws ApiError
     */
    public static getFiltersReqFileIdFiltersGet(
        fileId: string,
        field: string,
    ): CancelablePromise<FilterNames> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/{file_id}/filters}',
            path: {
                'file_id': fileId,
            },
            query: {
                'field': field,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
