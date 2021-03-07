import pytest
import flask_backend

def test_hello_world_success():  
    expected = flask_backend.hello_world()
    assert "Hello, World!" == expected

def test_get_scuccess():
    expected = flask_backend.get_users('GET')
    assert expected[0] == {task:"math homework", desc:"do the math homework you nerd", priority:8, type:"School", checked:"false", date:""}
    assert expected[1] == {task:"chores for me mum", desc:"why do i have to do laundry again", priority:0, type:"House Work", checked:"false", date:""}
