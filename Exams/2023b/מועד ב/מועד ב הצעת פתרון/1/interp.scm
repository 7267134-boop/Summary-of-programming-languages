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

        (do-exp (ids inits steps bools results)
          (cond
            ((zero? (length ids)) (eopl:error 'do-exp "do loop with no variables are not allowed"))
             ((zero? (length bools)) (eopl:error 'do-exp "do loop with no booleans are not allowed"))
             (else
               (let ((new-env (create-do-env ids inits env)))
                 (run-do-loop ids steps bools results new-env)))))
                 

        )))

  (define create-do-env
    (lambda (ids inits env)
      (if (null? ids)
          env
          (let* ((val1 (value-of (car inits) env))
                 (new-env (extend-env (car ids) val1 env)))
            (create-do-env (cdr ids) (cdr inits) new-env)))))

  (define run-do-loop
    (lambda (ids steps bools results env)
      (let ((result (check-bools bools env)))
        (if (= result (length bools))
            (let ((new-env (step-iteration ids steps env))) ; no bool matched
              (run-do-loop ids steps bools results new-env))
            (value-of (list-ref results result) env))))) ; bool matched

  (define check-bools
    (lambda (bools env)
      (if (null? bools)
          0
          (let ((result (value-of (car bools) env)))
            (if (expval->bool result)
                0
                (+ 1 (check-bools (cdr bools) env)))))))

  (define step-iteration
    (lambda (ids steps env)
      (let* ((cur-values (map (lambda (id) (expval->num (apply-env env id))) ids))
             (steps-values (map (lambda (e) (expval->num (value-of e env))) steps)))
        (apply-steps ids cur-values steps-values env))))

  (define apply-steps
    (lambda (ids values steps env)
      (if (null? ids)
          env
          (apply-steps (cdr ids) (cdr values) (cdr steps) (extend-env (car ids) (num-val (+ (car values) (car steps))) env)))))

  )

