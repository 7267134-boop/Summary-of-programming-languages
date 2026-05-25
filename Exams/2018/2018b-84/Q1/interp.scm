(module interp (lib "eopl.ss" "eopl")
  
  ;; interpreter for the LET language.  The \commentboxes are the
  ;; latex code for inserting the rules into the code in the book.
  ;; These are too complicated to put here, see the text, sorry.

  (require "drscheme-init.scm")

  (require "lang.scm")
  (require "data-structures.scm")
  (require "environments.scm")

  (provide value-of-program value-of)

;;;;;;;;;;;;;;;; the interpreter ;;;;;;;;;;;;;;;;

  ;; value-of-program : Program -> ExpVal
  ;; Page: 71
  (define value-of-program 
    (lambda (pgm)
      (cases program pgm
        (a-program (exp1)
          (value-of exp1 (init-env))))))

  ;; value-of : Exp * Env -> ExpVal
  ;; Page: 71
  (define value-of
    (lambda (exp env)
      (cases expression exp

        ;\commentbox{ (value-of (const-exp \n{}) \r) = \n{}}
        (const-exp (num) (num-val num))

        ;\commentbox{ (value-of (var-exp \x{}) \r) = (apply-env \r \x{})}
        (var-exp (var) (apply-env env var))

        ;\commentbox{\diffspec}
        (diff-exp (exp1 exp2)
          (let ((val1 (value-of exp1 env))
                (val2 (value-of exp2 env)))
            (let ((num1 (expval->num val1))
                  (num2 (expval->num val2)))
              (num-val
                (- num1 num2)))))

        ;\commentbox{\zerotestspec}
        (zero?-exp (exp1)
          (let ((val1 (value-of exp1 env)))
            (let ((num1 (expval->num val1)))
              (if (zero? num1)
                (bool-val #t)
                (bool-val #f)))))
              
        ;;Q1 2018b-84
        (if-exp (bool exps1 exps2)
                (if (or (null? exps1) (null? exps2))
                    (eopl:error "You must give at least one exp for each list")
                    (if-apply bool exps1 exps2 env)))
;        (if-exp (exp1 exp2 exp3)
;          (let ((val1 (value-of exp1 env)))
;            (if (expval->bool val1)
;              (value-of exp2 env)
;              (value-of exp3 env))))

        ;\commentbox{\ma{\theletspecsplit}}
        (let-exp (var exp1 body)       
          (let ((val1 (value-of exp1 env)))
            (value-of body
              (extend-env var val1 env))))

        )))
  (define if-apply
    (lambda (bool exps1 exps2 env)
      (let ((boolval (value-of bool env)))
        (if (expval->bool boolval)
            (if(= 1 (length exps1))
               (value-of (car exps1) env)
               (begin
                 (value-of (car exps1) env)
                 (if-apply bool (cdr exps1) exps2 env)))
            (if(= 1 (length exps2))
               (value-of (car exps2) env)
               (begin
                 (value-of (car exps2) env)
                 (if-apply bool exps1 (cdr exps2) env)))))))
          

  )

