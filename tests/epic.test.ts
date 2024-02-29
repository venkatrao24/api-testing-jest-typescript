import type { CancelableRequest } from 'got';
import got from 'got';

import { API_KEY, BEFORE_ALL_TIMEOUT, HOST } from '../utils/env.ts';
import { queryParams } from '../utils/query-params.ts';

const urlQuery = {
  api_key: API_KEY,
};

const ENDPOINT = '/EPIC/api/natural';

// Describe consists from a variables to show the request in the output:
// «Request https://api.nasa.gov/EPIC/api/natural?api_key=DEMO_KEY»
describe(`Request ${HOST}${ENDPOINT}?${queryParams(urlQuery)}`, () => {
  let response: CancelableRequest | any;

  beforeAll(async () => {
    try {
      response = await got.get(`${HOST}${ENDPOINT}`, {
        responseType: 'json',
        searchParams: urlQuery,
      });
    } catch (error: any) {
      if (!error.response) {
        throw new Error(error);
      }

      response = error.response;
    }
  }, BEFORE_ALL_TIMEOUT);

  test('Should have response status 200', () => {
    expect(response.statusCode).toBe(200);
  });

  test('Should have content-type = application/json', () => {
    expect(response.headers['content-type']).toBe('application/json');
  });

  test('Should have array in the body', () => {
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('Should have correct coodinates in each element of the body', () => {
    // Just an example of a loop through array,
    // not a pattern to follow in all tests, cause this check can be done through schema validation
    response.body.forEach((element: any) => {
      // https://jest-extended.jestcommunity.dev/docs/matchers/Number#tobewithinstart-end
      expect(element.centroid_coordinates.lat).toBeWithin(-90, 90);
      expect(element.centroid_coordinates.lon).toBeWithin(-180, 180);
    });
  });
});
