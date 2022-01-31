import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllInDayFromProvider from '../dtos/IFindAllInDayFromProviderDTO';
import IFindAllInMonthFromPRovider from '../dtos/IFindAllInMonthFromProviderDTO';

export default interface IAppointmentsRepository {
  find(): Promise<Appointment[]>;
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(
    data: IFindAllInMonthFromPRovider,
  ): Promise<Appointment[]>;
  findAllInDayFromProvider(
    data: IFindAllInDayFromProvider,
  ): Promise<Appointment[]>;
}
