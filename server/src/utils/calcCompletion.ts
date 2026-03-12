import { COMPLETION_FIELDS } from "../modules/app/profile/profile.constants";
import { IProfile } from "../modules/app/profile/profile.types";

export const calcCompletion = (profile: IProfile): number => {
    let filled = 0;
    for (const field of COMPLETION_FIELDS) {

        const val = profile[field];

           // if the field is an array and has at least one item, counts
        if (Array.isArray(val) && val.length > 0) filled++;

         // if the field is not an array and has a truthy value, counts
        else if (!Array.isArray(val) && val) filled++;
    }
    return Math.round((filled / COMPLETION_FIELDS.length) * 100);
};