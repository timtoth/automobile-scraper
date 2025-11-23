import { ZodError, ZodObject } from "zod";
import { Request, Response, NextFunction } from "express";
import { $ZodIssue } from "zod/v4/core";

export const validate =
    (schema: ZodObject<any, any>) =>
        (req: Request, res: Response, next: NextFunction) => {
            try {
                schema.parse({
                    body: req.body,
                    params: req.params,
                    query: req.query,
                });
                next();
            } catch (err: any) {
                if (err instanceof ZodError) {
                    const errorMessages = err.issues.map((issue: $ZodIssue) => ({
                        message: `${issue.path.join('.')} is ${issue.message}`,
                    }))
                    return res.status(400).json({ error: 'Invalid data', details: errorMessages });
                } else {
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
            }
        };
