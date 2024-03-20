import { config } from 'dotenv'
import { describe } from '@jest/globals'
import { getPlaceAutocomplete } from '../src/maps-api'
import * as axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Unit testing components', () => {
    beforeEach(() => {
        mockedAxios.get.mockReturnValueOnce({ data: {
                results: [
                    {
                        "type": "POI",
                        "id": "dmd3cjJBhnvZdGAPLSTmjA",
                        "address": {
                            "streetName": "Queen Charlotte Street",
                            "municipality": "Windsor",
                            "countrySecondarySubdivision": "Berkshire",
                            "countrySubdivision": "ENG",
                            "countrySubdivisionName": "England",
                            "countrySubdivisionCode": "ENG",
                            "postalCode": "SL4 1",
                            "countryCode": "GB",
                            "country": "United Kingdom",
                            "countryCodeISO3": "GBR",
                            "freeformAddress": "Queen Charlotte Street, Windsor, SL4 1",
                            "localName": "Windsor"
                        }
                    }
                ]
            } });
    })

    it("Verify Address conversion logic", async () => {

        const res = await getPlaceAutocomplete('test-api-key', 'test-query');

        const expectedResult = [
            {
                "placeId": "dmd3cjJBhnvZdGAPLSTmjA",
                "municipality": "Windsor",
                "streetNumber": "Queen Charlotte Street",
                "countryCode": "GB",
                "country": "United Kingdom",
                "freeformAddress": "Queen Charlotte Street, Windsor, SL4 1",
            }
        ]
        expect(res).toEqual(expectedResult);
    })
})
