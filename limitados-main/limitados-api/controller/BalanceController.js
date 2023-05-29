const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Group = require("../models/group");
const Expense = require("../models/expense");
const User = require("../models/user");

class BalanceController {
   static async getBalance(groupId) {
      try {
         // Obter o grupo a partir do ID
         const group = await Group.findById(groupId).populate("members");

         // Obter todas as despesas associadas a esse grupo
         const expenses = await Expense.find({ group: group._id }).populate(
            "user"
         );

         // Calcular o saldo de cada membro do grupo
         const balances = group.members.map((member) => ({
            userId: member._id,
            username: member.username,
            balance: expenses.reduce((total, expense) => {
               if (expense.user._id.equals(member._id)) {
                  // Despesas pagas por esse membro
                  return total - expense.splitAmount;
               } else if (expense.splitWith.includes(member._id)) {
                  // Despesas divididas com esse membro
                  const splitCount = expense.splitWith.length + 1; // incluindo o usuário que pagou
                  return total + expense.splitAmount / splitCount;
               } else {
                  // Despesas não relacionadas a esse membro
                  return total;
               }
            }, 0),
         }));

         // Retornar o saldo de cada membro do grupo
         return balances;
      } catch (err) {
         console.error(err);
         throw new Error("Erro ao obter o saldo do grupo");
      }
   }

   static async getTransfers(groupId) {
      try {
         // Obter o saldo de cada membro do grupo
         const balances = await this.getBalance(groupId);

         // Calcular as transferências necessárias para igualar os saldos
         const transfers = [];
         while (balances.length > 1) {
            // Ordenar os saldos em ordem crescente
            balances.sort((a, b) => a.balance - b.balance);

            // Obter os membros com o menor e maior saldo
            const sender = balances.shift();
            const receiver = balances.pop();

            // Calcular a transferência necessária
            const amount = Math.min(
               Math.abs(sender.balance),
               Math.abs(receiver.balance)
            );
            sender.balance += amount;
            receiver.balance -= amount;

            // Adicionar a transferência na lista
            transfers.push({
               sender: sender.username,
               receiver: receiver.username,
               amount: amount.toFixed(2),
            });

            // Verificar se o saldo do membro que recebeu a transferência é diferente de zero
            if (receiver.balance !== 0) {
               balances.push(receiver);
            }
         }

         // Retornar as transferências necessárias para igualar os saldos
         return transfers;
      } catch (err) {
         console.error(err);
         throw new Error("Erro ao obter as transferências do grupo");
      }
   }
}

module.exports = BalanceController;
