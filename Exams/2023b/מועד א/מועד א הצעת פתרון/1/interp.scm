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
            (cases expval val1
              (excp-val (excp1) (excp-val excp1))
              (num-val (num1)
                (cases expval val2
                  (excp-val (excp2) (excp-val excp2))
                  (num-val (num2)
                    (num-val (- num1 num2)))
                  (else (excp-val (Exception "not a number")))))
              (else (excp-val (Exception "not a number"))))))
            

        ;\commentbox{\zerotestspec}
        (zero?-exp (exp1)
          (let ((val1 (value-of exp1 env)))
            (cases expval val1
              (excp-val (excp) (excp-val excp))
              (num-val (num1)
                (if (zero? num1)
                  (bool-val #t)
                  (bool-val #f)))
              (else (excp-val (Exception "not a number"))))))
              
        ;\commentbox{\ma{\theifspec}}
        (if-exp (exp1 exp2 exp3)
          (let ((val1 (value-of exp1 env)))
            (cases expval val1
              (excp-val (excp) (excp-val excp))
              (bool-val (bool1)
                (if bool1
                  (value-of exp2 env)
                  (value-of exp3 env)))
              (else (excp-val (Exception "not a boolean"))))))
              

        ;\commentbox{\ma{\theletspecsplit}}
        (let-exp (var exp1 body)       
          (let ((val1 (value-of exp1 env)))
            (cases expval val1
              (excp-val (excp) (excp-val excp))
              (else (value-of body (extend-env var val1 env))))))

        (throw-exp (excpt)
          (let ((val excpt))
            (excp-val val)))

        (try-exp (exp1 excpts excptexps finexps)
          ; make sure there is 0 or 1 finexps
          (let ((fin-len (length finexps)))
            (if (> fin-len 1)
                (eopl:error 'try-exp "Too many finally expressions: ~s" fin-len)
                (let ((body-val (value-of exp1 env)))
                  (cases expval body-val
                    (excp-val (exception) ; search for matching handler
                              (let
                                ((catch-val (match-exception exception excpts excptexps env)))
                                (begin
                                  (if (= 1 fin-len)
                                      (value-of (car finexps) env)
                                      '())
                                  catch-val)
                                ))
                    (else body-val))))))

        )))

  (define match-exception
    (lambda (exception excpts excptexps env)
      (if (null? excpts)
          (excp-val exception)
          (if (equal? exception (car excpts))
              (value-of (car excptexps) env)
              (match-exception exception (cdr excpts) (cdr excptexps) env)))))

  )

