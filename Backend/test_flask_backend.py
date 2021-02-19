import pytest
import flask_backend

def test_find_users_by_name_success():  
    expected = { 
        'users_list' :
        [
            {
                'id' : 'abc123',            
                'name': 'Mac',
                'job': 'Bouncer',
            },
            {
                'id' : 'ppp222',            
                'name': 'Mac',
                'job': 'Professor',
            },        
        ]
    }  
    assert flask_backend.find_users_by_name("Mac") == expected
