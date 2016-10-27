var appConfig = {
    activeEndpoint:"@@environment",
    appEndpointList:{
        default:{
            getPeople:"mocks/people.json",
            setSelectedPeron:"mocks/people.json",
        },
        dev:{
            getPeople:"mocks/people.json",
            setSelectedPeron:"mocks/people.json",
        }
    }
};