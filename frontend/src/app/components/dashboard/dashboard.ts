import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LancamentoService } from './services/lancamento.service';
import { BudgetService } from './services/budget.service';
import { GoalService } from './services/goal.service';
import { CategoriaService } from './services/categoria.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  
  username: string = 'Usuário';
  userId: number | null = null;
  showUserMenu: boolean = false;
  
  // Forms data
  transactionDate: string = '';
  transactionAmount: number | null = null;
  transactionDescription: string = '';
  transactionCategory: string = '';
  
  budgetDate: string = '';
  budgetAmount: number | null = null;
  
  goalName: string = '';
  goalAmount: number | null = null;
  goalCategory: string = '';
  
  // Data for display
  summaryBudget: number = 0;
  summarySpent: number = 0;
  summaryBalance: number = 0;
  
  transactions: any[] = [];
  goals: any[] = [];
  budgets: any[] = [];
  categories: any[] = [];
  expenseChartData: any[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private lancamentoService: LancamentoService,
    private budgetService: BudgetService,
    private goalService: GoalService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit() {
    this.setCurrentDate();
    this.setCurrentMonth();
    this.getUserFromToken();
    if (this.userId) {
      this.loadAllData(this.userId);
    }
  }

  getUserFromToken() {
    const token = this.authService.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.userId = payload.id;
        this.username = payload.username; 
      } catch (e) {
        console.error('Error decoding token', e);
        this.logout();
      }
    }
  }

  loadAllData(userId: number) {
    this.loadCategories();
    this.loadTransactions(userId);
    this.loadBudgets(userId);
    this.loadGoals(userId);
  }

  loadCategories() {
    this.categoriaService.getCategorias().subscribe(data => {
      this.categories = data;
    });
  }

  loadTransactions(userId: number) {
    this.lancamentoService.getLancamentos(userId).subscribe(data => {
      this.transactions = data;
      this.updateSummary();
      this.calculateExpenseChartData();
    });
  }

  loadBudgets(userId: number) {
    this.budgetService.getBudgets(userId).subscribe(data => {
      this.budgets = data;
      this.updateSummary();
    });
  }

  loadGoals(userId: number) {
    this.goalService.getGoals(userId).subscribe(data => {
      this.goals = data;
    });
  }

  calculateExpenseChartData() {
    if (this.transactions.length === 0 || this.summarySpent === 0) {
      this.expenseChartData = [];
      return;
    }

    const categoryTotals = this.transactions.reduce((acc, transaction) => {
      const categoryId = transaction.category_id;
      const amount = parseFloat(transaction.amount || 0);
      if (!acc[categoryId]) {
        acc[categoryId] = 0;
      }
      acc[categoryId] += amount;
      return acc;
    }, {} as { [key: number]: number });

    this.expenseChartData = Object.keys(categoryTotals).map(categoryId => {
      const categoryIdNum = parseInt(categoryId);
      const total = categoryTotals[categoryIdNum];
      const percentage = (total / this.summarySpent) * 100;
      return {
        categoryName: this.getCategoryName(categoryIdNum),
        total: total,
        percentage: percentage
      };
    });
  }

  setCurrentDate() {
    const today = new Date();
    this.transactionDate = today.toISOString().split('T')[0];
  }

  setCurrentMonth() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    this.budgetDate = `${year}-${month}`;
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  navigateToSettings() {
    this.router.navigate(['/user-settings']);
    this.showUserMenu = false;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onTransactionSubmit() {
    if (this.transactionDate && this.transactionAmount && this.transactionDescription && this.transactionCategory && this.userId) {
      const newTransaction = {
        date: this.transactionDate,
        amount: this.transactionAmount,
        description: this.transactionDescription,
        category_id: parseInt(this.transactionCategory),
        user_id: this.userId,
        tipo_lancamento: 'despesa'
      };
      
      this.lancamentoService.createLancamento(newTransaction).subscribe(() => {
        alert('Lançamento adicionado com sucesso!');
        this.loadTransactions(this.userId!);
        this.resetTransactionForm();
      });
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }

  onBudgetSubmit() {
    if (this.budgetDate && this.budgetAmount && this.userId) {
      const newBudget = {
        month_year: `${this.budgetDate}-01`, // Format to YYYY-MM-DD
        budget_amount: this.budgetAmount,
        user_id: this.userId
      };
      
      this.budgetService.createBudget(newBudget).subscribe(() => {
        alert('Orçamento salvo com sucesso!');
        this.loadBudgets(this.userId!);
        this.resetBudgetForm();
      });
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }

  onGoalSubmit() {
    if (this.goalName && this.goalAmount && this.goalCategory && this.userId) {
      const newGoal = {
        name: this.goalName,
        amount: this.goalAmount,
        category_id: parseInt(this.goalCategory),
        user_id: this.userId
      };
      
      this.goalService.createGoal(newGoal).subscribe(() => {
        alert('Meta adicionada com sucesso!');
        this.loadGoals(this.userId!);
        this.resetGoalForm();
      });
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }

  resetTransactionForm() {
    this.transactionAmount = null;
    this.transactionDescription = '';
    this.transactionCategory = '';
    this.setCurrentDate();
  }

  resetBudgetForm() {
    this.budgetAmount = null;
    this.setCurrentMonth();
  }

  resetGoalForm() {
    this.goalName = '';
    this.goalAmount = null;
    this.goalCategory = '';
  }

  updateSummary() {
    this.summaryBudget = this.budgets.reduce((sum, budget) => sum + parseFloat(budget.budget_amount || 0), 0);
    this.summarySpent = this.transactions.reduce((sum, transaction) => sum + parseFloat(transaction.amount || 0), 0);
    this.summaryBalance = this.summaryBudget - this.summarySpent;
  }

  deleteTransaction(id: number) {
    if (confirm('Tem certeza que deseja excluir este lançamento?')) {
      this.lancamentoService.deleteLancamento(id).subscribe(() => {
        this.loadTransactions(this.userId!);
      });
    }
  }

  deleteGoal(id: number) {
    if (confirm('Tem certeza que deseja excluir esta meta?')) {
      this.goalService.deleteGoal(id).subscribe(() => {
        this.loadGoals(this.userId!);
      });
    }
  }

  deleteBudget(id: number) {
    if (confirm('Tem certeza que deseja excluir este orçamento?')) {
      this.budgetService.deleteBudget(id).subscribe(() => {
        this.loadBudgets(this.userId!);
      });
    }
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : 'Sem categoria';
  }
}
