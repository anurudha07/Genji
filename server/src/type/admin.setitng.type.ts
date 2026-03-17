import { Document, Types, Schema } from 'mongoose';

export interface ISettings extends Document {
    settingsKey: string;
    settingsValue: Schema.Types.Mixed;
    lastUpdatedBy: Types.ObjectId;
}