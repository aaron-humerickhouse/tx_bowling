import * as Matchers from "@pact-foundation/pact/dsl/matchers";

import AddressesService from "./addresses";

describe("AddressesService", () => {


  const EXPECTED_BODY = {
    id: 1,
    street_address: '5700 Grover Ave',
    secondary_address: '',
    city: 'Austin',
    state: 'TX',
    zip_code: '78756',
    notes: 'Near the school',
    created_at: "2020-04-13T03:21:34.548Z",
    updated_at: "2020-04-13T03:21:34.548Z"
  };

  const RESPONSE_BODY = {
    id: Matchers.integer(1),
    street_address: Matchers.string('5700 Grover Ave'),
    secondary_address: Matchers.string(''),
    city: Matchers.string('Austin'),
    state: Matchers.string('TX'),
    zip_code: Matchers.string('78756'),
    notes: Matchers.string('Near the school'),
    created_at: Matchers.iso8601DateTimeWithMillis("2020-04-13T03:21:34.548Z"),
    updated_at: Matchers.iso8601DateTimeWithMillis("2020-04-13T03:21:34.548Z")
  };

  const CREATE_BODY = {
    street_address: EXPECTED_BODY['street_address'],
    secondary_address: EXPECTED_BODY['secondary_address'],
    city: EXPECTED_BODY['city'],
    state: EXPECTED_BODY['state'],
    zip_code: EXPECTED_BODY['zip_code'],
    notes: EXPECTED_BODY['notes']
  };

  // describe("getAddresses", () => {
  //   beforeEach( () => {
  //     const interaction = {
  //       state: "there are multiple addresses",
  //       uponReceiving: "a request for retrieving addresses",
  //       withRequest: {
  //         method: "GET",
  //         path: "/api/v1/addresses.json",
  //         query: {},
  //         headers: {
  //           Accept: "application/json",
  //         },
  //       },
  //       willRespondWith: {
  //         status: 200,
  //         headers: {
  //           "Content-Type": "application/json; charset=utf-8",
  //         },
  //         body: {
  //           addresses:
  //             Matchers.eachLike(RESPONSE_BODY),
  //         },
  //       },
  //     };
  //
  //     return provider.addInteraction(interaction);
  //   });
  //
  //   it("returns a successful body", async () => {
  //     const response = await new AddressesService().getAddresses();
  //
  //     expect(response.headers["content-type"]).toEqual("application/json; charset=utf-8");
  //     expect(response.data).toEqual({ addresses: [EXPECTED_BODY] });
  //     expect(response.status).toEqual(200);
  //   })
  // });

  describe("getAddress", () => {
    beforeEach( () => {
      const interaction = {
        state: "there is an address with an id of 1",
        uponReceiving: "a request for retrieving a single address",
        withRequest: {
          method: "GET",
          path: "/api/v1/addresses/1.json",
          query: {},
          headers: {
            Accept: "application/json",
          },
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: {
            address: RESPONSE_BODY,
          },
        },
      };

      return provider.addInteraction(interaction);
    });

    it("returns a successful body", async () => {
      const response = await new AddressesService().getAddress(1);

      expect(response.headers["content-type"]).toEqual("application/json; charset=utf-8");
      expect(response.data).toEqual({ address: EXPECTED_BODY });
      expect(response.status).toEqual(200);
    })
  });

  describe('createAddress', ()=> {
    beforeEach( () => {
      const interaction = {
        state: "default state",
        uponReceiving: "a request for creating an address",
        withRequest: {
          method: "POST",
          path: "/api/v1/addresses.json",
          body: CREATE_BODY,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
        },
        willRespondWith: {
          status: 201,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: {
            address: RESPONSE_BODY,
          },
        },
      };

      return provider.addInteraction(interaction);
    });

    it("returns a successful body", async () => {
      const response = await new AddressesService().createAddress(CREATE_BODY);

      expect(response.headers["content-type"]).toEqual("application/json; charset=utf-8");
      expect(response.data).toEqual({ address: EXPECTED_BODY });
      expect(response.status).toEqual(201);
    })
  })
});
