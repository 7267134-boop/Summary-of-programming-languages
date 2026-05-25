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
        
        ;;Q1 2019b-84
        (max-exp (var)
                 (let* ((vlst (find-all var env (list ))))
                   (if (= (length vlst) 0)
                       (eopl:error "you must give at least one variable in env") 
                       (let* ((mval (find-max vlst 0))
                              (new-env (extend-env var mval env)))
                         (value-of (const-exp mval) new-env)))))
        )))
  
  ;;Return the max value in list of numbers.
  (define find-max
    (lambda (lst val)
      (if (null? lst)
          val
          (if (> val (car lst))
              (find-max (cdr lst) val)
              (find-max (cdr lst) (car lst))))))
  
  ;;Return list of all values of numbers for our variable.
  (define find-all
    (lambda (var env lst)
      (if(empty-env? env)
         lst
         (let ((svar (extended-env-record->sym env));;env isn't empty yet
               (val  (extended-env-record->val env))
               (old-env (extended-env-record->old-env env)))
           (if (eqv? var svar)
              (cases expval val
                (num-val (num) (find-all var old-env (append lst (list (expval->num val)))))
                 (else (find-all var old-env lst)))
              (find-all var old-env lst))))))

  ;;idk what to do with this
  (define empty-env? 
    (lambda (x)
      (empty-env-record? x)))
;      
;       (define apply-env
;    (lambda (env search-sym)
;      (if (empty-env? env)
;	(eopl:error 'apply-env "No binding for ~s" search-sym)
;	(let ((sym (extended-env-record->sym env))
;	      (val (extended-env-record->val env))
;	      (old-env (extended-env-record->old-env env)))
;	  (if (eqv? search-sym sym)
;	    val
;	    (apply-env old-env search-sym))))))

  )

