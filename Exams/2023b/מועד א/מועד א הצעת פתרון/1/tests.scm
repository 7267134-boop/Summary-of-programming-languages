(module tests mzscheme
  
  (provide test-list)

  ;;;;;;;;;;;;;;;; tests ;;;;;;;;;;;;;;;;
  
  (define test-list
    '(
  
      ;; simple arithmetic
      (positive-const "11" 11)
      (negative-const "-33" -33)
      (simple-arith-1 "-(44,33)" 11)
  
      ;; nested arithmetic
      (nested-arith-left "-(-(44,33),22)" -11)
      (nested-arith-right "-(55, -(22,11))" 44)
  
      ;; simple variables
      (test-var-1 "x" 10)
      (test-var-2 "-(x,1)" 9)
      (test-var-3 "-(1,x)" -9)
      
      ;; simple unbound variables
      ;(test-unbound-var-1 "foo" error)
      ;(test-unbound-var-2 "-(x,foo)" error)
  
      ;; simple conditionals
      (if-true "if zero?(0) then 3 else 4" 3)
      (if-false "if zero?(1) then 3 else 4" 4)
      
      ;; test dynamic typechecking
      ;(no-bool-to-diff-1 "-(zero?(0),1)" error)
      ;(no-bool-to-diff-2 "-(1,zero?(0))" error)
      ;(no-int-to-if "if 1 then 2 else 3" error)

      ;; make sure that the test and both arms get evaluated
      ;; properly. 
      (if-eval-test-true "if zero?(-(11,11)) then 3 else 4" 3)
      (if-eval-test-false "if zero?(-(11, 12)) then 3 else 4" 4)
      
      ;; and make sure the other arm doesn't get evaluated.
      (if-eval-test-true-2 "if zero?(-(11, 11)) then 3 else foo" 3)
      (if-eval-test-false-2 "if zero?(-(11,12)) then foo else 4" 4)

      ;; simple let
      (simple-let-1 "let x = 3 in x" 3)

      ;; make sure the body and rhs get evaluated
      (eval-let-body "let x = 3 in -(x,1)" 2)
      (eval-let-rhs "let x = -(4,1) in -(x,1)" 2)

      ;; check nested let and shadowing
      (simple-nested-let "let x = 3 in let y = 4 in -(x,y)" -1)
      (check-shadowing-in-body "let x = 3 in let x = 4 in x" 4)
      (check-shadowing-in-rhs "let x = 3 in let x = -(x,1) in x" 2)

      ;; throw
      (simple-throw "throw general" "general")
      (multi-string-throw "throw not a number" "not a number")

      ;; not a number
      (not-a-number-exception-1 "-(6,zero?(9))" "not a number")
      (not-a-number-exception-2 "let t= -(6,zero?(9)) in 78" "not a number")
      (not-a-number-exception-3 "zero?(zero?(1))" "not a number")

      ;; environment
      (env-exception-1 "-(t,8)" "environment")
      (env-exception-2 "t" "environment")
      (env-exception-3 "let x = t in x" "environment")

      ;; not a boolean
      (not-a-boolean-exception "if -(2,1) then 1 else 0" "not a boolean")

      ;; too many finally
      (too-many-finally "try { 1 } finally : 200 ; finally : 300 ;" error)

      ;; no exception
      (no-exception "try { 1 } finally : 200 ;" 1)

      ;; try except
      (try-except-1 "try { -(if -(4,6) then 70 else 20, 45) } catch [general] : 11 ; catch [not a number] : 12; catch [not a boolean] : 13 ; catch [environment] : 14 ; finally : 200;" 13)
      (try-except-2 "try { throw general } catch [general] : 11 ; catch [not a number] : 12; catch [not a boolean] : 13 ; catch [environment] : 14 ; finally : 200;" 11)
      (try-except-3 "try { zero?(zero?(1)) } catch [general] : 11 ; catch [not a number] : 12; catch [not a boolean] : 13 ; catch [environment] : 14 ; finally : 200;" 12)
      (try-except-4 "try { -(if -(4,6) then 70 else 20, 45) } catch [general] : 11 ; catch [not a number] : 12; catch [not a boolean] : throw general ; catch [environment] : 14 ; finally : 200;" "general")
      (try-except-5 "try { -(if -(4,6) then 70 else 20, 45) } catch [general] : 11 ; catch [not a number] : 12; catch [environment] : 14 ; finally : 200;" "not a boolean")

      ))
  )