import { Util } from "Services/Utility/Util";

export class VerifyMemberModelMapper {
    constructor(source) {
        this.source = source;
    }

    //NOTE
    //casing is important because the server expects it
    toDto() {
        const primaryIdFields = this._getIdDocumentFields(this.source.primaryId);
        const primaryIdName = this._getName(this.source.primaryId);

        const secondaryIdFields = this._getIdDocumentFields(this.source.secondaryId);
        const secondaryIdName = this._getName(this.source.secondaryId);

        let secondaryId = null;

        if (!Util.isNullOrUndefined(secondaryIdFields)) {
            secondaryId = {
                DateOfBirth: this.source.primaryId.dateOfBirth,
                ...secondaryIdName,
                ...secondaryIdFields
            }
        }

        const result = {
            CurrentAddress: this.source.primaryId.currentAddress,
            PreviousAddress: this.source.primaryId.previousAddress,
            PrimaryDocument: {
                DateOfBirth: this.source.primaryId.dateOfBirth,
                ...primaryIdName,
                ...primaryIdFields
            },
            SecondaryDocument: secondaryId
        };

        return result;
    }

    _getName(source) {
        if (Util.isNullOrUndefined(source)) {
            return undefined;
        }

        return {
            GivenName: this._replaceBadCharacters(source.firstName),
            MiddleName: this._replaceBadCharacters(source.middleName),
            Surname: this._replaceBadCharacters(source.lastName)
        }
    }

    _getIdDocumentFields(source) {
        if (Util.isNullOrUndefined(source)) {
            return undefined;
        }

        let idFields = null;

        switch (source.identificationType) {
            case "DriversLicence":
                idFields = this._getDrivingLicence(source);
                break;

            case "AustralianPassport":
                idFields = this._getAustralianPassport(source);
                break;

            case "ForeignPassport":
                idFields = this._getForeignPassport(source);
                break;

            case "Medicare":
                idFields = this._getMedicare(source);
                break;
        }

        if (!Util.isNullOrUndefined(idFields)) {
            idFields.DocumentType = source.identificationType;
        }

        return idFields;
    }

    _getDrivingLicence(source) {
        return {
            Number: source.licenceNumber,
            State: source.licenceState
        }
    }

    _getAustralianPassport(source) {
        return {
            Number: source.auPassportNumber
        }
    }

    _getForeignPassport(source) {
        return {
            Number: source.passportNumber,
            CountryOfIssue: source.passportCountry
        }
    }

    _getMedicare(source) {
        return {
            Number: source.medicareNumber,
            IndividualReferenceNumber: source.position,
            NameOnCard: this._replaceBadCharacters(source.fullName),
            CardColour: source.cardTypeOption,
            Expiry: source.expiryDate
        }
    }

    _replaceBadCharacters(value) {
        if (value) {
            return value.replace(/[’‘]/g, "'");
        }

        return value;
    }
}