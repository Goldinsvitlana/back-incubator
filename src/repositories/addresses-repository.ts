
const addresses = [{id: 1, value: 'Nezalejnasti 12'}, {id: 2, value: 'Selickaga 11'}]

export const addressesRepository = {
    findAddresses(value: string | null | undefined) {
        if (value) {
            let filteredAddresses = addresses.filter(p => p.value.indexOf(value) > -1)
          return filteredAddresses
        } else {
          return addresses
          }

}
}