import { Request, Response } from 'express';
import { conn } from "../database";

async function saveSteps(req: Request, res: Response) {
    try {
        const steps = req.body;
        const query = "INSERT INTO steps (steps) VALUES ($1) RETURNING *";
        const values = [steps];
        const response = await conn.query(query, values);
        return res.json(response.rows[0]);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
}

async function getSteps(req: Request, res: Response) {
    try {
        const query = "SELECT steps FROM steps;";
        const response = await conn.query(query);
        return res.json(response.rows);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
}

function generateSteps(req: Request, res: Response) {
    try {
        const {num1, num2} = req.body;
        const regex = /^[1-9]\d*$/;
        if (regex.test(num1) && regex.test(num2)) {
            const result = generate(num1, num2);
            return res.json(result);
        }
        else {
            return res.status(400).json({ message: "Only Positive Numbers allowed!" });
        }
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    } 
}

function generate(numStr1:String, numStr2:String) {

    const maxLength = Math.max(numStr1.length, numStr2.length);
    numStr1 = numStr1.padStart(maxLength, '0');
    numStr2 = numStr2.padStart(maxLength, '0');

    let carry = 0;
    let carryString = '';
    let sumString = '';

    const result: Record<string, { carryString: string, sumString: string }> = {};

    for (let i = maxLength - 1; i >= 0; i--) {
      const digit1 = parseInt(numStr1[i]);
      const digit2 = parseInt(numStr2[i]);
      const sum = digit1 + digit2 + carry;
      if (sum < 10) {
        sumString = sum + sumString;
        carry = 0;
        if (i > 0) {
          carryString = carry + carryString;
        }
      } else {
        if (i > 0) {
          sumString = (sum - 10) + sumString;
        } else {
          sumString = sum + sumString;
        }
        carry = 1;
        if (i > 0) {
          carryString = carry + carryString;
        }
      }

      result[`Step${maxLength - i}`] = {
        "carryString": carryString + "_",
        "sumString": sumString
      }

    }

    return result;
  }

export default {
    saveSteps,
    getSteps,
    generateSteps
}