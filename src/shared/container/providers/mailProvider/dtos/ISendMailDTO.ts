import IParseMailTemplateDTO from '../../mailTemplateProvider/dtos/IParseMailTemplateDTO';

interface IMailContact {
  name: string;
  email: string;
}

export default interface ISendMailDTO {
  to: IMailContact;
  from?: IMailContact;
  replyTo?: string;
  subject: string;
  templateData: IParseMailTemplateDTO;
}
