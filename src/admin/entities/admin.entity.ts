import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdminDocument = Admin & Document;

@Schema()
export class Admin {
    @Prop()
    id: string;

    @Prop()
    pwd: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);