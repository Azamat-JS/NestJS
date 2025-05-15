import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'user' })
  role: string;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ default: 0 })
  verificationCode: number;

  @Prop()
  verificationCodeExpires: Date;

  @Prop({type:String, default:null, index:true})
  resetPasswordToken: string | null;

  @Prop({type:String, default:null})
  resetPasswordExpires: Date | null;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<UserDocument>('save', async function (next) {
  if (this.isModified('password') && !this.password.startsWith('$2b$')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
