(module interp (lib "eopl.ss" "eopl")
  
  ;; interpreter for the IMPLICIT-REFS language

  (require "drscheme-init.scm")

  (require "lang.scm")
  (require "data-structures.scm")
  (require "environments.scm")
  (require "store.scm")
  
  (provide value-of-program value-of instrument-let instrument-newref)

;;;;;;;;;;;;;;;; switches for instrument-let ;;;;;;;;;;;;;;;;

  (define instrument-let (make-parameter #f))

  ;; say (instrument-let #t) to turn instrumentation on.
  ;;     (instrument-let #f) to turn it off again.

;;;;;;;;;;;;;;;; the interpreter ;;;;;;;;;;;;;;;;

  ;; value-of-program : Program -> ExpVal
  (define value-of-program 
    (lambda (pgm)
      (initialize-store!)
      (cases program pgm
        (a-program (exp1)
          (value-of exp1 (init-env))))))

  ;; value-of : Exp * Env -> ExpVal
  ;; Page: 118, 119
  (define value-of
    (lambda (exp env)
      (cases expression exp

        ;\commentbox{ (value-of (const-exp \n{}) \r) = \n{}}
        (const-exp (num) (num-val num))

        ;\commentbox{ (value-of (var-exp \x{}) \r) 
        ;              = (deref (apply-env \r \x{}))}
        (var-exp (var) (deref (apply-env env var)))

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
          (let ((v1 (value-of exp1 env)))
            (value-of body
              (extend-env var (newref v1) env))))
        
        (proc-exp (var body)
          (proc-val (procedure var body env)))

        (call-exp (rator rand)
          (let ((proc (expval->proc (value-of rator env)))
                (arg (value-of rand env)))
            (apply-procedure proc arg)))

        (letrec-exp (p-names b-vars p-bodies letrec-body)
          (value-of letrec-body
            (extend-env-rec* p-names b-vars p-bodies env)))

        (begin-exp (exp1 exps)
          (letrec 
            ((value-of-begins
               (lambda (e1 es)
                 (let ((v1 (value-of e1 env)))
                   (if (null? es)
                     v1
                     (value-of-begins (car es) (cdr es)))))))
            (value-of-begins exp1 exps)))

        (assign-exp (var exp1)
          (begin
            (setref!
              (apply-env env var)
              (value-of exp1 env))
            (num-val 27)))
        
        ;;Q2 2020b-88
        ;;I've build a new type dict-val
        (dict-exp (keys values)
                  (if (null? keys)
                      (dict-val (empty-dict));;No keys to add, set empty dict.
                      (apply-dict keys values (empty-dict))))
        
        (dictAdd-exp(dict1 key value)
                    (let* ((dict-ref (apply-env env dict1))
                           (dictval (deref dict-ref))
                           (exists (isExists? key (expval->dict dictval) env)))
                      (if (eqv? exists #t)
                          (eopl:error "key already exists!")
                          (begin
                            (setref! dict-ref (dict-val (dict key value (expval->dict dictval))))
                            (num-val 27)))))
        
        (dictKey-exp (dict1 key)
                     (let*  ((dict-ref (apply-env env dict1))
                             (dictval (deref dict-ref))
                             (exists (isExists? key (expval->dict dictval) env)))
                       (if(eqv? exists #t)
                          (getValue key (expval->dict dictval) env)
                          (eopl:error "key isn't exist"))))
        

        )))

  ;;add new keys and values to the dictionary and return expval->dict
  (define apply-dict
    (lambda (keys values dic)
      (if(null? keys)
         (dict-val dic)
         (apply-dict (cdr keys) (cdr values) (dict (car keys) (car values) dic)))))
  
  ;;Checking if key is exists in dictionary
    (define (isExists? key dic env)
      (cases dictionary dic
        (empty-dict () #f)
        (dict (skey sval sdict) (let ((key1 (value-of key env))
                                       (key2 (value-of skey env)))
                                  (cases expval key1
                                    (num-val (num1) (cases expval key2
                                                     (num-val (num2) (if (eqv? num1 num2)
                                                                         #t
                                                                         (isExists? key sdict env)))
                                                      (else  (isExists? key sdict env))))
                                    (bool-val (bool1) (cases expval key2
                                                       (bool-val (bool2) (if (eqv? bool1 bool2)
                                                                             #t
                                                                             (isExists? key sdict env)))
                                                        (else  (isExists? key sdict env))))
                                    (else (eopl:error "I'm too lazy for this shit")))))))
  
  ;;Same as eisExists? but will return the value.
    (define (getValue key dic env)
      (cases dictionary dic
        (empty-dict () (eopl:error "something went wrong, Key isn't exists"))
        (dict (skey sval sdict) (let ((key1 (value-of key env))
                                       (key2 (value-of skey env)))
                                  (cases expval key1
                                    (num-val (num1) (cases expval key2
                                                     (num-val (num2) (if (eqv? num1 num2)
                                                                         (value-of sval env)
                                                                         (getValue key sdict env)))
                                                      (else  (getValue key sdict env))))
                                    (bool-val (bool1) (cases expval key2
                                                       (bool-val (bool2) (if (eqv? bool1 bool2)
                                                                             (value-of sval env)
                                                                             (getValue key sdict env)))
                                                        (else  (getValue key sdict env))))
                                    (else (eopl:error "I'm too lazy for this shit")))))))
  
  ;; apply-procedure : Proc * ExpVal -> ExpVal
  ;; Page: 119

  ;; uninstrumented version
  ;;  (define apply-procedure
  ;;    (lambda (proc1 val)
  ;;      (cases proc proc1
  ;;        (procedure (var body saved-env)
  ;;          (value-of body
  ;;            (extend-env var (newref val) saved-env))))))
  
  ;; instrumented version
  (define apply-procedure
    (lambda (proc1 arg)
      (cases proc proc1
        (procedure (var body saved-env)
          (let ((r (newref arg)))
            (let ((new-env (extend-env var r saved-env)))
              (if (instrument-let)
                (begin
                  (eopl:printf
                    "entering body of proc ~s with env =~%"
                    var)
                  (pretty-print (env->list new-env)) 
                  (eopl:printf "store =~%")
                  (pretty-print (store->readable (get-store-as-list)))
                  (eopl:printf "~%")))
              (value-of body new-env)))))))  

  ;; store->readable : Listof(List(Ref,Expval)) 
  ;;                    -> Listof(List(Ref,Something-Readable))
  (define store->readable
    (lambda (l)
      (map
        (lambda (p)
          (list
            (car p)
            (expval->printable (cadr p))))
        l)))

  )
  


  
