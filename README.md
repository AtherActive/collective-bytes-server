# collective-bytes-server
An API server controlling the Bytes system in Collective.

## So, what's this about?
In Collective, we are creating Minigames. For this we wanted a shared currncy, being Bytes. All minigames can interact with this API with a key. The idea is to allow users to play different games with the same currency and make a good Developer experience too!

## Getting a Key
To get a key, please contact me (Saltylelele) on Discord! Please tell me what you are making, and what permissions you will need. You can find those below.

## Permissions
Your token can have several permissions. Here they are, listed in their Interface
```json
export interface IPermissions {
    /**@param {boolean} read Read permissions to the API. */
    read: boolean
    /**take_capped Allow to take Currency at a cap */
    take_capped: ICappedPermission
    /**give_capped Allow to give Currency at a cap */
    give_capped: ICappedPermission
    /**take_uncapped Allow uncapped take access */
    take_uncapped: boolean
    /**give_uncapped Allow uncapped give access */
    give_uncapped: boolean
    /**set Allow set access (overwrite esentially) */
    set: boolean
    /**if this token is a developer token */
    devToken: boolean
}
```

## Contribution setup
Contribution is simple! Clone the repository, run `npm i` and get to work! When making PR's, create them to the `develop` branch. Any PR going to main is instantly denied. Make sure you code is well documented, and any changes to the API are also updated in the swagger.json file found in `/docs`.