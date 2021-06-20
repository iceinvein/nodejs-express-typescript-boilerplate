import express from 'express';
import session from 'express-session';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import lusca from 'lusca';
import { SESSION_SECRET } from './config';
import errorHandler from './middlewares/error-handler';
import indexRouter from './routes/v1/index';

const app = express();

app.use(compression());
app.use(cors);
app.use(helmet);
app.use(cookieParser());
app.use(express.json());
app.use(session({ secret: SESSION_SECRET || '', resave: true, saveUninitialized: true }));
app.use(lusca.csrf());
app.use(
  lusca.csp({
    policy: {
      'default-src': "'self'",
      'img-src': '*',
    },
  }),
);
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use(lusca.nosniff());
app.use(lusca.hsts({ maxAge: 31536000 }));
app.use(lusca.referrerPolicy('same-origin'));
app.use('/', indexRouter);
app.use(errorHandler);

export default app;
