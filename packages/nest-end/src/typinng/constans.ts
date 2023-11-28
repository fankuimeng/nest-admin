
import * as dayjs from 'dayjs';
import { DATE_FORMATE } from './enum';

export const CurrentTime = dayjs().format(DATE_FORMATE.DATE)