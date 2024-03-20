import axios from 'axios'
import {Address} from "./types";

// https://developer.tomtom.com/search-api/documentation/search-service/fuzzy-search
export async function getPlaceAutocomplete(key: string, address: string) : Promise<Address[]> {
    const autocomplete = await axios.get(`https://api.tomtom.com/search/2/search/${address}.json'`, {
        params: {
            key,
            limit: 100,
            countrySet: process.env.COUNTRY_SET
        }
    });

    return autocomplete.data.results.map((result) : Address => {
        const placeId = result.id;
        const {streetName, municipality, countryCode, country, freeformAddress} = result.address;
        return {
            placeId, streetNumber: streetName, municipality, countryCode, country, freeformAddress
        }
    })
}
