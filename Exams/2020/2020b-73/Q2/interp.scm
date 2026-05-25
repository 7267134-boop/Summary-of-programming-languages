(module interp (lib "eopl.ss" "eopl")
  
  ;; interpreter for the PROC language, using the data structure
  ;; representation of procedures.

  ;; The \commentboxes are the latex code for inserting the rules into
  ;; the code in the book. These are too complicated to put here, see
  ;; the text, sorry. 

  (require "drscheme-init.scm")

  (require "lang.scm")
  (require "data-structures.scm")
  (require "environments.scm")

  (provide value-of-program value-of)

;;;;;;;;;;;;;;;; the interpreter ;;;;;;;;;;;;;;;;

  ;; value-of-program : Program -> ExpVal
  (define value-of-program 
    (lambda (pgm)
      (cases program pgm
        (a-program (exp1)
          (value-of exp1 (init-env))))))

  ;; value-of : Exp * Env -> ExpVal
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
              
        ;\commentbox{\ma{\theifspec}}
        (if-exp (exp1 exp2 exp3)
          (let ((val1 (value-of exp1 env)))
            (if (expval->bool val1)
              (value-of exp2 env)
              (value-of exp3 env))))

        ;\commentbox{\ma{\theletspecsplit}}
        (let-exp (var exp1 body)       
          (let ((val1 (value-of exp1 env)))
            (value-of body
              (extend-env var val1 env))))
        
;        (proc-exp (var body)
;          (proc-val (procedure var body env)))
;
;        (call-exp (rator rand)
;          (let ((proc (expval->proc (value-of rator env)))
;                (arg (value-of rand env)))
;            (apply-procedure proc arg)))
        
        ;;Q2 2020b-73
        (proc-exp (id1 id2 def body)
                  (let* ((v2 (value-of def env))
                         (new-env (extend-env id2 v2 env)))
                    (proc-val (procedure id1 body new-env))))
        
        (call-exp (exp1 exps)
                  (if (or (< (length exps) 1) (> (length exps) 2))
                      (eopl:error "Illegal input!")
                      (let ((proc1 (expval->proc (value-of exp1 env)))
                            (arg (value-of (car exps) env)))
                        (if (eqv? (length exps) 1)
                            ;;Only 1 value
                             (apply-procedure proc1 arg)
                            ;;Two values
                            (let* ((old-env (cases proc proc1
                                              (procedure (var body saved-env) saved-env))) ;;Saving the old env that proc keeps
                                   (sid2 (extended-env-record->sym old-env)) ;;Getting the second variable from old env.
                                   (new-env (extend-env sid2 (value-of (cadr exps) env) env))) ;;defining a new env with new second var
                              (cases proc proc1
                                (procedure (svar sbody senv)
                                           (value-of sbody (extend-env svar arg new-env)))))))))
                                                 )))

  ;; apply-procedure : Proc * ExpVal -> ExpVal
  ;; Page: 79
  (define apply-procedure
    (lambda (proc1 val)
      (cases proc proc1
        (procedure (var body saved-env)
          (value-of body (extend-env var val saved-env))))))

  )
