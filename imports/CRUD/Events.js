import { Communities } from '../collections/communities'

import { People } from '../collections/people'

export const GetCommunities = async () =>  {
    const result = People.find()

    return result
}