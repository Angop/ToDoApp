import pytest
import flask_backend

def test_hello_world_success():  
    expected = flask_backend.hello_world()
    assert "Hello, World!" == expected
